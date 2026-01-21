import { MAX_FILE_SIZE, SUPPORTED_EXTENSIONS } from './constants';

/**
 * Validate file size
 */
export function validateFileSize(file) {
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File is too large (${formatFileSize(file.size)}). The maximum limit is ${formatFileSize(MAX_FILE_SIZE)}.`,
    };
  }
  return { valid: true };
}

/**
 * Validate file type
 */
export function validateFileType(file, acceptedTypes) {
  const extension = getFileExtension(file.name).toLowerCase();
  const isAccepted = acceptedTypes.some(type => 
    type.replace('.', '').toLowerCase() === extension
  );
  
  if (!isAccepted) {
    return {
      valid: false,
      error: `"${extension.toUpperCase()}" files are not supported for this tool. Please use: ${acceptedTypes.join(', ')}.`,
    };
  }
  return { valid: true };
}

/**
 * Validate file for conversion
 */
export function validateFile(file, tool) {
  // Check size
  const sizeCheck = validateFileSize(file);
  if (!sizeCheck.valid) return sizeCheck;
  
  // Check type
  const typeCheck = validateFileType(file, tool.acceptedTypes);
  if (!typeCheck.valid) return typeCheck;
  
  return { valid: true };
}

/**
 * Get file extension
 */
export function getFileExtension(filename) {
  return filename.split('.').pop() || '';
}

/**
 * Check if file extension is supported
 */
export function isSupportedExtension(filename) {
  const ext = getFileExtension(filename).toLowerCase();
  return SUPPORTED_EXTENSIONS.includes(ext);
}

/**
 * Format file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Generate random ID for file paths
 */
export function generateRandomId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Get MIME type from extension
 */
export function getMimeType(filename) {
  const ext = getFileExtension(filename).toLowerCase();
  const mimeTypes = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    tiff: 'image/tiff',
    tif: 'image/tiff',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}
