import axios from 'axios';
import FormData from 'form-data';

const BASE_URL = 'https://api.ilovepdf.com/v1';

/**
 * iLovePDF API Client
 */
export class ILovePDFClient {
  constructor(publicKey, secretKey) {
    this.publicKey = publicKey;
    this.secretKey = secretKey;
    this.token = null;
  }

  /**
   * Get authentication token from iLovePDF server
   * Using /auth endpoint instead of self-signing for free tier compatibility
   */
  async getAuthToken() {
    const response = await axios.post(
      `${BASE_URL}/auth`,
      { 
        public_key: this.publicKey,
        secret_key: this.secretKey
      },
      { timeout: 10000 }
    );
    
    return response.data.token;
  }

  async startTask(taskType) {
    try {
      // Get token from /auth endpoint (required for free tier)
      const token = await this.getAuthToken();
      const url = `${BASE_URL}/start/${taskType}`;

      console.log(`Starting iLovePDF task at: ${url}`);
      
      const response = await axios.get(
        url,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      console.log('Start task response:', JSON.stringify(response.data));

      return {
        server: response.data.server,
        taskId: response.data.task,
        token: token,
      };
    } catch (error) {
      console.error('startTask error:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', JSON.stringify(error.response.data));
      }
      throw error;
    }
  }

  /**
   * Upload file to task
   */
  async uploadFile(server, taskId, token, fileData, fileName) {
    const formData = new FormData();
    formData.append('task', taskId);
    formData.append('file', fileData, { filename: fileName });

    const response = await axios.post(
      `https://${server}/v1/upload`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          ...formData.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    return {
      serverFilename: response.data.server_filename,
    };
  }

  /**
   * Process the task
   */
  async processTask(server, taskId, token, files, taskType, options = {}) {
    const taskOptions = this.getTaskOptions(taskType, options);
    
    // For rotate task, add rotation to each file object
    const filesWithOptions = files.map(f => {
      const fileObj = {
        server_filename: f.serverFilename,
        filename: f.filename,
      };
      if (taskType === 'rotate') {
        fileObj.rotate = options.rotation || 90;
      }
      return fileObj;
    });

    const processData = {
      task: taskId,
      tool: taskType,
      files: filesWithOptions,
      ...taskOptions,
    };

    console.log('Processing task:', taskType);
    console.log('Task options:', JSON.stringify(taskOptions, null, 2));
    console.log('Process data:', JSON.stringify(processData, null, 2));

    const response = await axios.post(
      `https://${server}/v1/process`,
      processData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      downloadFilename: response.data.download_filename,
      filesize: response.data.filesize,
      timer: response.data.timer,
    };
  }

  /**
   * Download the result
   */
  async downloadResult(server, taskId, token) {
    const response = await axios.get(
      `https://${server}/v1/download/${taskId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        responseType: 'arraybuffer',
      }
    );

    return {
      data: Buffer.from(response.data),
      contentType: response.headers['content-type'],
      filename: this.extractFilename(response.headers['content-disposition']),
    };
  }

  /**
   * Extract filename from content-disposition header
   */
  extractFilename(contentDisposition) {
    if (!contentDisposition) return 'converted_file';
    
    const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    if (filenameMatch && filenameMatch[1]) {
      return filenameMatch[1].replace(/['"]/g, '');
    }
    return 'converted_file';
  }

  /**
   * Get task-specific options
   */
  getTaskOptions(taskType, options) {
    switch (taskType) {
      case 'compress':
        return {
          compression_level: options.quality || 'recommended',
        };
      
      case 'pdfjpg':
        return {
          pdfjpg_mode: 'pages', // or 'extract'
          ...(options.pageRange && { 
            ranges: options.pageRange.mode === 'custom' ? options.pageRange.range : undefined 
          }),
        };
      
      case 'split':
        // If mode is 'all' or not specified, use 'pages' mode (extract all pages)
        if (!options.pageRange || options.pageRange.mode === 'all') {
          return {
            split_mode: 'pages',
          };
        }
        
        // Otherwise use custom range
        return {
          split_mode: 'ranges',
          ranges: options.pageRange.range || '1',
        };
      
      case 'rotate':
        // Rotation is handled per-file in processTask
        return {};
      
      case 'watermark':
        return {
          mode: 'text',
          text: options.watermark?.text || 'WATERMARK',
          pages: 'all',
          vertical_position: this.mapPosition(options.watermark?.position, 'vertical'),
          horizontal_position: this.mapPosition(options.watermark?.position, 'horizontal'),
          font_size: 14,
          font_color: '#000000',
          transparency: options.watermark?.opacity || 50,
        };
      
      case 'pdfocr':
        // iLovePDF API requires ocr_languages as an array
        const language = options.ocrLanguage || 'eng';
        return {
          ocr_languages: Array.isArray(language) ? language : [language],
        };
      
      case 'pagenumber':
        return {
          facing_pages: false,
          first_cover: false,
          pages: 'all',
          vertical_position: 'bottom',
          horizontal_position: 'right',
          font_family: 'Arial',
          font_size: 12,
          font_color: '#000000',
        };
      
      case 'unlock':
        const password = typeof options.password === 'object' 
          ? (options.password?.password || '') 
          : (options.password || '');
        console.log('Unlock password:', password);
        return {
          password: password,
        };

      case 'protect':
        const protectPassword = typeof options.password === 'object' 
          ? (options.password?.password || '') 
          : (options.password || '');
        return {
          password: protectPassword,
        };
      
      case 'officepdf':
        return {};

      default:
        return {};
    }
  }

  /**
   * Map position to iLovePDF format
   */
  mapPosition(position, axis) {
    const positionMap = {
      'top-left': { vertical: 'top', horizontal: 'left' },
      'top': { vertical: 'top', horizontal: 'center' },
      'top-right': { vertical: 'top', horizontal: 'right' },
      'left': { vertical: 'middle', horizontal: 'left' },
      'center': { vertical: 'middle', horizontal: 'center' },
      'right': { vertical: 'middle', horizontal: 'right' },
      'bottom-left': { vertical: 'bottom', horizontal: 'left' },
      'bottom': { vertical: 'bottom', horizontal: 'center' },
      'bottom-right': { vertical: 'bottom', horizontal: 'right' },
    };

    const pos = positionMap[position] || positionMap.center;
    return pos[axis];
  }

  /**
   * Complete conversion workflow
   */
  async convert(taskType, fileBuffer, fileName, options = {}) {
    // Step 1: Start task
    const { server, taskId, token } = await this.startTask(taskType);

    // Step 2: Upload file
    const { serverFilename } = await this.uploadFile(
      server, 
      taskId, 
      token, 
      fileBuffer, 
      fileName
    );

    // Step 3: Process
    const processResult = await this.processTask(
      server,
      taskId,
      token,
      [{ serverFilename, filename: fileName }],
      taskType,
      options
    );

    // Step 4: Download result
    const downloadResult = await this.downloadResult(server, taskId, token);

    return {
      ...downloadResult,
      timer: processResult.timer,
    };
  }

  /**
   * Convert multiple files (for merge)
   */
  async convertMultiple(taskType, files, options = {}) {
    // Step 1: Start task
    const { server, taskId, token } = await this.startTask(taskType);

    // Step 2: Upload all files
    const uploadedFiles = [];
    for (const file of files) {
      const { serverFilename } = await this.uploadFile(
        server,
        taskId,
        token,
        file.buffer,
        file.name
      );
      uploadedFiles.push({ serverFilename, filename: file.name });
    }

    // Step 3: Process
    const processResult = await this.processTask(
      server,
      taskId,
      token,
      uploadedFiles,
      taskType,
      options
    );

    // Step 4: Download result
    const downloadResult = await this.downloadResult(server, taskId, token);

    return {
      ...downloadResult,
      timer: processResult.timer,
    };
  }
}
