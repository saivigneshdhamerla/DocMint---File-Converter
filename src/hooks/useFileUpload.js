import { useState, useCallback } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../services/firebase';
import { generateRandomId } from '../utils/fileValidation';

export function useFileUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [error, setError] = useState(null);

  const uploadFile = useCallback(async (file) => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);
    setUploadedUrl(null);

    try {
      const randomId = generateRandomId();
      const storagePath = `uploads/${randomId}/${file.name}`;
      const storageRef = ref(storage, storagePath);

      return new Promise((resolve, reject) => {
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error('Upload error:', error);
            setIsUploading(false);
            
            let userMessage = 'Failed to upload file. Please try again.';
            if (error.code === 'storage/unauthorized') {
              userMessage = 'Upload unauthorized. Please check your permissions.';
            } else if (error.code === 'storage/canceled') {
              userMessage = 'Upload canceled.';
            } else if (error.code === 'storage/quota-exceeded') {
              userMessage = 'Storage quota reached. Please contact support.';
            } else if (!window.navigator.onLine) {
              userMessage = 'You are offline. Please check your internet connection.';
            }
            
            setError(userMessage);
            reject(error);
          },
          async () => {
            try {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              setUploadedUrl(downloadUrl);
              setIsUploading(false);
              resolve({
                url: downloadUrl,
                path: storagePath,
                fileName: file.name,
                fileSize: file.size,
              });
            } catch (err) {
              setIsUploading(false);
              setError('Failed to get upload URL.');
              reject(err);
            }
          }
        );
      });
    } catch (err) {
      setIsUploading(false);
      setError('Upload failed. Please try again.');
      throw err;
    }
  }, []);

  const uploadMultipleFiles = useCallback(async (files) => {
    const results = [];
    for (const file of files) {
      const result = await uploadFile(file);
      results.push(result);
    }
    return results;
  }, [uploadFile]);

  const resetUpload = useCallback(() => {
    setUploadProgress(0);
    setIsUploading(false);
    setUploadedUrl(null);
    setError(null);
  }, []);

  return {
    uploadFile,
    uploadMultipleFiles,
    uploadProgress,
    isUploading,
    uploadedUrl,
    error,
    resetUpload,
  };
}
