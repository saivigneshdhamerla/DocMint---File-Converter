import * as functions from 'firebase-functions';
import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Scheduled cleanup function - runs every hour (v1)
 */
export const cleanupExpiredFiles = functions.pubsub
  .schedule('every 60 minutes')
  .onRun(async (context) => {
    console.log('Starting cleanup job...');

    const storage = getStorage();
    const bucket = storage.bucket();
    const db = getFirestore();

    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

    let deletedFiles = 0;
    let deletedRecords = 0;

    try {
      // Cleanup uploads folder
      const [uploadsFiles] = await bucket.getFiles({ prefix: 'uploads/' });
      for (const file of uploadsFiles) {
        const [metadata] = await file.getMetadata();
        const createdTime = new Date(metadata.timeCreated).getTime();
        
        if (createdTime < oneHourAgo) {
          await file.delete();
          deletedFiles++;
          console.log(`Deleted: ${file.name}`);
        }
      }

      // Cleanup converted folder
      const [convertedFiles] = await bucket.getFiles({ prefix: 'converted/' });
      for (const file of convertedFiles) {
        const [metadata] = await file.getMetadata();
        const createdTime = new Date(metadata.timeCreated).getTime();
        
        if (createdTime < oneHourAgo) {
          await file.delete();
          deletedFiles++;
          console.log(`Deleted: ${file.name}`);
        }
      }

      // Cleanup old rate limit records (older than 24 hours)
      const rateLimitsRef = db.collection('rateLimits');
      const oldRecords = await rateLimitsRef
        .where('lastReset', '<', new Date(oneDayAgo))
        .get();

      const batch = db.batch();
      oldRecords.forEach((doc) => {
        batch.delete(doc.ref);
        deletedRecords++;
      });

      if (deletedRecords > 0) {
        await batch.commit();
      }

      console.log(`Cleanup complete. Deleted ${deletedFiles} files and ${deletedRecords} rate limit records.`);

    } catch (error) {
      console.error('Cleanup error:', error);
      throw error;
    }
  }
);
