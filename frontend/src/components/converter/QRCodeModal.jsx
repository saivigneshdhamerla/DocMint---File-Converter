import { useState, useEffect } from 'react';
import { QrCode, X } from 'lucide-react';
import QRCodeLib from 'qrcode';

export default function QRCodeModal({ downloadUrl, isExpired, fileName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && downloadUrl && !isExpired) {
      generateQRCode();
    }
  }, [isOpen, downloadUrl, isExpired]);

  const generateQRCode = async () => {
    try {
      setError(null);
      
      // Create a URL to our download page with the file URL and name as params
      // This will trigger automatic download when accessed
      const currentOrigin = window.location.origin;
      const downloadPageUrl = new URL('/download', currentOrigin);
      downloadPageUrl.searchParams.set('url', downloadUrl);
      downloadPageUrl.searchParams.set('name', fileName);
      
      const qrUrl = downloadPageUrl.toString();
      
      const dataUrl = await QRCodeLib.toDataURL(qrUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'M',
      });
      setQrCodeDataUrl(dataUrl);
    } catch (err) {
      console.error('QR code generation failed:', err);
      setError('Failed to generate QR code');
    }
  };

  const handleOpen = () => {
    if (!isExpired) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* QR Button */}
      <button
        onClick={handleOpen}
        disabled={isExpired}
        className="btn-secondary flex items-center justify-center gap-2 px-4 py-3 text-sm min-h-[48px]"
        title="Scan QR code to download on mobile"
      >
        <QrCode className="w-4 h-4" />
        QR Code
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={handleClose}
        >
          <div
            className="relative bg-white dark:bg-dark border-2 border-gray-200 dark:border-neutral-border rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-tertiary transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>

            {/* Header */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-dark-secondary mb-3">
                <QrCode className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Scan to Download
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Scan this QR code with your phone's camera
              </p>
            </div>

            {/* QR Code */}
            <div className="flex items-center justify-center mb-4">
              {error ? (
                <div className="text-center p-6">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                  <button
                    onClick={generateQRCode}
                    className="mt-3 text-xs text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Try again
                  </button>
                </div>
              ) : qrCodeDataUrl ? (
                <div className="p-3 bg-white rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <img
                    src={qrCodeDataUrl}
                    alt="QR Code for download"
                    className="w-full h-auto select-none"
                    style={{ maxWidth: '240px' }}
                  />
                </div>
              ) : (
                <div className="p-10">
                  <div className="w-6 h-6 border-4 border-gray-300 border-t-black dark:border-t-white rounded-full animate-spin mx-auto"></div>
                </div>
              )}
            </div>

            {/* File info */}
            {fileName && (
              <div className="text-center mb-4">
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">
                  File name
                </p>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate px-2" title={fileName}>
                  {fileName}
                </p>
              </div>
            )}

            {/* Instructions */}
            <div className="p-3 bg-gray-50 dark:bg-dark-secondary rounded-xl">
              <p className="text-[10px] text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                Open your phone's camera and point it at the QR code. Tap the notification to download.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
