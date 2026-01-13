import dotenv from 'dotenv';
dotenv.config();

import { initializeApp } from 'firebase-admin/app';

// Initialize Firebase Admin
initializeApp();

// Export functions
export { convertFile } from './convertFile.js';
export { cleanupExpiredFiles } from './cleanup.js';
