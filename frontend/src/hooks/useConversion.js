import { useState, useCallback } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../services/firebase';
import { FILE_EXPIRATION_MS } from '../utils/constants';

export function useConversion() {
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const getMeaningfulError = useCallback((err, type) => {
    const msg = err.message || '';
    
    // Unlock specific errors
    if (type === 'unlock') {
      if (msg.includes('400') || msg.includes('Bad Request') || msg.includes("This task can't be processed")) {
        return {
          message: 'Unlock failed. This file could not be unlocked.',
          suggestions: [
            'Ensure the password provided is correct.',
            'The file might use AES-256 encryption, which is currently unsupported.',
            'Try using a standard PDF password protected file.'
          ]
        };
      }
    }

    // Common iLovePDF errors
    if (msg.includes('LIMIT_REACHED')) {
      return {
        message: 'Daily conversion limit reached.',
        suggestions: ['Please wait until tomorrow or try a different network.']
      };
    }

    if (msg.includes('FILE_CORRUPT')) {
      return {
        message: 'The uploaded file appears to be corrupted.',
        suggestions: ['Try re-saving the file or using a different version.']
      };
    }

    if (msg.includes('WRONG_PASSWORD')) {
      return {
        message: 'Invalid password provided.',
        suggestions: ['Double-check the password and try again.']
      };
    }

    return {
      message: msg || 'Conversion failed. Please try again.',
      suggestions: [
        'Check your internet connection.',
        'Try refreshing the page and re-uploading the file.',
        'Ensure the file is not password protected (unless using Unlock tool).'
      ]
    };
  }, []);

  const convertFile = useCallback(async ({ fileUrl, fileName, conversionType, options = {} }) => {
    setIsConverting(true);
    setError(null);
    setConversionProgress(0);
    setResult(null);

    try {
      setConversionProgress(10);
      const convertFileFunction = httpsCallable(functions, 'convertFile');
      
      const progressInterval = setInterval(() => {
        setConversionProgress((prev) => {
          if (prev >= 85) return prev;
          return prev + Math.random() * 5;
        });
      }, 800);

      const response = await convertFileFunction({
        fileUrl,
        fileName,
        conversionType,
        options,
      });

      clearInterval(progressInterval);
      setConversionProgress(100);

      const data = response.data;
      if (!data.success) {
        throw new Error(data.error || 'Conversion failed');
      }

      const conversionResult = {
        downloadUrl: data.downloadUrl,
        fileName: data.fileName,
        fileSize: data.fileSize,
        expiresAt: Date.now() + FILE_EXPIRATION_MS,
      };

      setResult(conversionResult);
      setIsConverting(false);
      return conversionResult;
    } catch (err) {
      setIsConverting(false);
      const meaningfulError = getMeaningfulError(err, conversionType);
      setError(meaningfulError);
      throw err;
    }
  }, [getMeaningfulError]);

  const resetConversion = useCallback(() => {
    setIsConverting(false);
    setConversionProgress(0);
    setResult(null);
    setError(null);
  }, []);

  return {
    convertFile,
    isConverting,
    conversionProgress,
    result,
    error,
    resetConversion,
  };
}

