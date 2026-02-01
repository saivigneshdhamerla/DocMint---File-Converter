import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Download, FileText, ArrowLeft } from 'lucide-react';

export default function FileViewerPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const fileUrl = searchParams.get('url');
  const fileName = searchParams.get('name');
  const [fileType, setFileType] = useState('');

  useEffect(() => {
    if (fileName) {
      const ext = fileName.split('.').pop()?.toLowerCase();
      setFileType(ext || '');
    }
  }, [fileName]);

  const handleDownload = async () => {
    try {
      // Fetch file as blob to force download
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      // Fallback to opening in new tab
      window.open(fileUrl, '_blank');
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  if (!fileUrl || !fileName) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-dark">
        <div className="max-w-md w-full text-center">
          <div className="card p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
              <FileText className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Invalid Link
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The file link is missing or invalid
            </p>
            <button onClick={handleGoBack} className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Determine if file can be previewed in browser
  const canPreview = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'txt'].includes(fileType);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-dark border-b border-gray-200 dark:border-neutral-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            
            <div className="flex-1 min-w-0 text-center">
              <h1 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white truncate" title={fileName}>
                {fileName}
              </h1>
            </div>

            <button
              onClick={handleDownload}
              className="btn-primary inline-flex items-center gap-2 text-sm px-4 py-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* File Preview/Viewer */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {canPreview ? (
          <div className="bg-white dark:bg-dark border-2 border-gray-200 dark:border-neutral-border rounded-2xl overflow-hidden">
            {fileType === 'pdf' ? (
              <iframe
                src={fileUrl}
                className="w-full"
                style={{ height: 'calc(100vh - 180px)', minHeight: '600px' }}
                title={fileName}
              />
            ) : fileType === 'txt' ? (
              <iframe
                src={fileUrl}
                className="w-full bg-white dark:bg-dark"
                style={{ height: 'calc(100vh - 180px)', minHeight: '600px' }}
                title={fileName}
              />
            ) : (
              <div className="p-4 flex items-center justify-center" style={{ minHeight: '400px' }}>
                <img
                  src={fileUrl}
                  alt={fileName}
                  className="max-w-full h-auto rounded-lg"
                  style={{ maxHeight: 'calc(100vh - 250px)' }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-dark-secondary mb-6">
              <FileText className="w-8 h-8 text-gray-700 dark:text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Preview Not Available
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This file type (.{fileType}) cannot be previewed in the browser.
              <br />
              Click download to save it to your device.
            </p>
            <button onClick={handleDownload} className="btn-primary inline-flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download {fileName}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
