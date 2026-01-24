import { useState, useEffect } from 'react';
import { Download, Clock, Share2, CheckCircle, Copy, RefreshCw } from 'lucide-react';
import { formatCountdown, truncateFilename } from '../../utils/formatters';
import { formatFileSize } from '../../utils/fileValidation';
import { FILE_EXPIRATION_MS } from '../../utils/constants';
import toast from 'react-hot-toast';

export default function DownloadSection({ 
  downloadUrl, 
  fileName, 
  fileSize,
  expiresAt,
  onConvertAnother
}) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const remaining = expiresAt - Date.now();
      setTimeRemaining(Math.max(0, remaining));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleDownload = async () => {
    if (timeRemaining <= 0) {
      toast.error('File has expired. Please convert again.');
      return;
    }

    try {
      toast.loading('Starting download...');
      
      // Fetch file as blob to force download
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName; // Uses the filename from backend
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.dismiss();
      toast.success('Download started!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed. Opening in new tab...');
      // Fallback
      window.open(downloadUrl, '_blank');
    }
  };

  const handleShare = async () => {
    if (timeRemaining <= 0) {
      toast.error('File has expired');
      return;
    }

    try {
      await navigator.clipboard.writeText(downloadUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const isExpired = timeRemaining <= 0;
  const isExpiringSoon = timeRemaining > 0 && timeRemaining < 10 * 60 * 1000; // Less than 10 minutes

  return (
    <div className="card p-6 md:p-8 animate-fade-in">
      {/* Success header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            Conversion Complete
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ready to download
          </p>
        </div>
      </div>

      {/* File info */}
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-tertiary mb-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="font-medium text-gray-800 dark:text-white truncate" title={fileName}>
              {truncateFilename(fileName, 40)}
            </p>
            {fileSize && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formatFileSize(fileSize)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Expiration timer */}
      <div className={`
        flex items-center gap-2 p-3 rounded-xl mb-6
        ${isExpired 
          ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
          : isExpiringSoon 
            ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' 
            : 'bg-gray-100 dark:bg-dark-tertiary text-gray-700 dark:text-gray-300'
        }
      `}>
        <Clock className="w-5 h-5" />
        <span className="text-sm font-medium">
          {isExpired 
            ? 'File has expired' 
            : `File expires in ${formatCountdown(timeRemaining)}`
          }
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleDownload}
          disabled={isExpired}
          className={`
            flex-1 flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold
            ${isExpired ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-primary'}
            min-h-[48px]
          `}
        >
          <Download className="w-5 h-5" />
          Download File
        </button>

        <button
          onClick={handleShare}
          disabled={isExpired}
          className="btn-secondary flex items-center justify-center gap-2 px-4 py-3 text-sm min-h-[48px]"
        >
          {copied ? (
            <>
              <CheckCircle className="w-4 h-4 text-black dark:text-white" />
              Copied
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              Share
            </>
          )}
        </button>
      </div>

      {/* Convert another button */}
      <button
        onClick={onConvertAnother}
        className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Convert Another File
      </button>
    </div>
  );
}
