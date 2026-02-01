import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download, FileText } from 'lucide-react';

export default function DirectDownloadPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('downloading');
  const fileUrl = searchParams.get('url');
  const fileName = searchParams.get('name');

  useEffect(() => {
    if (!fileUrl || !fileName) {
      setStatus('error');
      return;
    }

    // Trigger automatic download
    const triggerDownload = async () => {
      try {
        setStatus('downloading');
        
        // Fetch the file as a blob
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error('Download failed');
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        // Create temporary link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        setStatus('success');
      } catch (error) {
        console.error('Download error:', error);
        setStatus('error');
      }
    };

    // Start download after a brief delay
    const timer = setTimeout(triggerDownload, 500);
    return () => clearTimeout(timer);
  }, [fileUrl, fileName]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-dark">
      <div className="max-w-md w-full text-center">
        <div className="card p-8">
          {status === 'downloading' && (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
                <Download className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-bounce" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Starting Download...
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your file should download automatically
              </p>
              {fileName && (
                <div className="p-4 bg-gray-50 dark:bg-dark-secondary rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium truncate">
                      {fileName}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {status === 'success' && (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                <Download className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Download Started!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Check your downloads folder
              </p>
              {fileUrl && (
                <a
                  href={fileUrl}
                  download={fileName}
                  className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Click here if download didn't start
                </a>
              )}
            </>
          )}

          {status === 'error' && (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
                <FileText className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Download Error
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The download link may be invalid or expired
              </p>
              {fileUrl && (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Try Direct Link
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
