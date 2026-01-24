import * as functions from 'firebase-functions';
import { getStorage } from 'firebase-admin/storage';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { promisify } from 'util';
import stream from 'stream';

import { ILovePDFClient } from './ilovepdf/client.js';
import { checkRateLimit, incrementRateLimit } from './middleware/rateLimit.js';

const pipeline = promisify(stream.pipeline);

/**
 * Main file conversion function (v1)
 */
export const convertFile = functions
  .runWith({
    memory: '1GB',
    timeoutSeconds: 540, // Increased to 9 minutes for large files
    maxInstances: 10,
  })
  .https.onCall(async (data, context) => {
    console.log('Received Convert Request:', JSON.stringify(data));
    const { fileUrl, fileName, conversionType, options = {} } = data;
    const clientIp = context.rawRequest?.ip || context.rawRequest?.headers['x-forwarded-for'] || 'unknown';
    console.log(`Client IP: ${clientIp}, Task: ${conversionType}`);

    // Load keys inside function to ensure config is ready
    const public_key = process.env.ILOVEPDF_PUBLIC_KEY || (functions.config().ilovepdf && functions.config().ilovepdf.public);
    const secret_key = process.env.ILOVEPDF_SECRET_KEY || (functions.config().ilovepdf && functions.config().ilovepdf.secret);

    // Normalize options to match backend expectations
    // Frontend sends keys like 'WatermarkSettings', backend expects 'watermark'
    const normalizedOptions = {
      ...options,
      watermark: options.WatermarkSettings || options.watermark,
      pageRange: options.PageRangeSelector || options.pageRange,
      rotation: options.RotationSelector || options.rotation,
      quality: options.QualitySelector || options.quality,
      password: options.PasswordInput || options.password,
      ocrLanguage: options.LanguageSelector || options.ocrLanguage,
    };

    console.log('Conversion request:', { conversionType, options, normalizedOptions });

    const tempFiles = [];

    try {
      // Validate configuration
      if (!public_key || !secret_key) {
        throw new functions.https.HttpsError('failed-precondition', 'Server configuration missing API keys');
      }

      // Validate input
      const missing = [];
      if (!fileUrl) missing.push('fileUrl');
      if (!conversionType) missing.push('conversionType');
      
      if (missing.length > 0) {
        console.error('Validation failed. Received data:', JSON.stringify(data));
        throw new functions.https.HttpsError('invalid-argument', `Missing parameters: ${missing.join(', ')}. Received: ${Object.keys(data).join(', ')}`);
      }
      
      // Initialize services
      const storage = getStorage();
      const db = getFirestore();
      const bucket = storage.bucket();

      // Check rate limit
      const rateLimitResult = await checkRateLimit(clientIp);
      if (!rateLimitResult.allowed) {
        throw new functions.https.HttpsError(
          'resource-exhausted',
          'Daily conversion limit reached. Try again tomorrow.'
        );
      }

      // Initialize iLovePDF client
      console.log('Initializing iLovePDF client...');
      const pdfClient = new ILovePDFClient(public_key, secret_key);

      // Perform conversion
      console.log(`Starting ${conversionType} conversion...`);
      
      const taskInfo = await pdfClient.startTask(conversionType);
      console.log('Task Started:', JSON.stringify(taskInfo));

      let result;
      
      if (Array.isArray(fileUrl)) {
        // Multiple files (merge)
        // Download all files to temp storage first
        const downloadedFiles = [];
        
        for (let i = 0; i < fileUrl.length; i++) {
            const url = fileUrl[i];
            const name = Array.isArray(fileName) ? fileName[i] : `file_${i}.pdf`;
            const tempFilePath = path.join(os.tmpdir(), `input_${uuidv4()}_${name}`);
            tempFiles.push(tempFilePath);

            console.log(`Downloading file ${i + 1}/${fileUrl.length} to ${tempFilePath}...`);
            await downloadToTemp(url, tempFilePath);
            downloadedFiles.push({ path: tempFilePath, name });
        }
        
        // Manual upload steps
        const uploadedFiles = [];
        for (const file of downloadedFiles) {
          const fileStream = fs.createReadStream(file.path);
          const { serverFilename } = await pdfClient.uploadFile(
            taskInfo.server,
            taskInfo.taskId,
            taskInfo.token,
            fileStream,
            file.name
          );
          uploadedFiles.push({ serverFilename, filename: file.name });
        }
        
        const processResult = await pdfClient.processTask(
          taskInfo.server,
          taskInfo.taskId,
          taskInfo.token,
          uploadedFiles,
          conversionType,
          normalizedOptions
        );
        
        const downloadResult = await pdfClient.downloadResult(
          taskInfo.server,
          taskInfo.taskId,
          taskInfo.token
        );
        
        result = { ...downloadResult, timer: processResult.timer };
      } else {
        // Single file
        const safeFileName = Array.isArray(fileName) ? (fileName[0] || 'file') : (fileName || 'file');
        const tempFilePath = path.join(os.tmpdir(), `input_${uuidv4()}_${safeFileName}`);
        tempFiles.push(tempFilePath);

        console.log(`Downloading file to ${tempFilePath}...`);
        await downloadToTemp(fileUrl, tempFilePath);

        const fileStream = fs.createReadStream(tempFilePath);

        result = await pdfClient.convert(
          conversionType,
          fileStream,
          safeFileName,
          normalizedOptions
        );
      }

      // Custom naming convention: {original_name}-docmint.{ext}
      const baseName = Array.isArray(fileName) ? (fileName[0] || 'merged') : (fileName || 'file');
      const nameWithoutExt = path.parse(baseName).name;
      const ext = path.parse(result.filename).ext;
      result.filename = `${nameWithoutExt}-docmint${ext}`;

      // Upload converted file to Firebase Storage
      console.log(`Uploading converted file to Storage as ${result.filename}...`);
      const convertedPath = `converted/${uuidv4()}/${result.filename}`;
      const convertedFile = bucket.file(convertedPath);

      await convertedFile.save(result.data, {
        metadata: {
          contentType: result.contentType,
          metadata: {
            expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
          },
        },
      });

      // Make the file public (using UUID for security) and get public URL
      // This avoids the 'iam.serviceAccounts.signBlob' permission error
      await convertedFile.makePublic();
      const downloadUrl = convertedFile.publicUrl();

      // Update stats
      await updateStats(db, conversionType);

      // Increment rate limit
      await incrementRateLimit(clientIp);

      console.log('Conversion complete!');

      return {
        success: true,
        downloadUrl,
        fileName: result.filename,
        fileSize: result.data.length,
        processingTime: result.timer,
      };

    } catch (error) {
      console.error('Conversion error:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        } : 'No response',
        config: error.config ? {
          url: error.config.url,
          method: error.config.method,
          data: error.config.data
        } : 'No config'
      });
      
      const iLovePdfError = error.response?.data?.error;
      const specificErrorMessage = iLovePdfError?.message || error.message;
      const errorCode = iLovePdfError?.code;
      const errorParam = iLovePdfError?.param;

      console.error('Extracted API Error:', { specificErrorMessage, errorCode, errorParam });

      return {
        success: false,
        error: specificErrorMessage,
        errorCode, // Pass this back to help debugging
        errorParam,
        stack: error.stack,
        details: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : null
      };
    } finally {
        // Cleanup temp files
        for (const file of tempFiles) {
            try {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                    console.log(`Deleted temp file: ${file}`);
                }
            } catch (cleanupError) {
                console.error(`Failed to delete temp file ${file}:`, cleanupError);
            }
        }
    }
  });

/**
 * Download file from URL to temporary file
 */
async function downloadToTemp(url, destPath) {
  const writer = fs.createWriteStream(destPath);
  
  const response = await axios.get(url, {
    responseType: 'stream',
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  });

  await pipeline(response.data, writer);
}

/**
 * Update conversion statistics
 */
async function updateStats(db, conversionType) {
  const statsRef = db.collection('stats').doc('global');
  const today = new Date().toISOString().split('T')[0];

  try {
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(statsRef);
      
      if (doc.exists) {
        const data = doc.data();
        const updates = {
          totalCount: FieldValue.increment(1),
          [`types.${conversionType}`]: FieldValue.increment(1),
          lastUpdated: FieldValue.serverTimestamp(),
        };

        // Reset today count if it's a new day
        if (data.todayDate !== today) {
          updates.todayCount = 1;
          updates.todayDate = today;
        } else {
          updates.todayCount = FieldValue.increment(1);
        }

        transaction.update(statsRef, updates);
      } else {
        transaction.set(statsRef, {
          totalCount: 1,
          todayCount: 1,
          todayDate: today,
          types: { [conversionType]: 1 },
          avgProcessingTime: 3,
          lastUpdated: FieldValue.serverTimestamp(),
        });
      }
    });
  } catch (error) {
    console.error('Failed to update stats:', error);
    // Don't throw - stats update is non-critical
  }
}
