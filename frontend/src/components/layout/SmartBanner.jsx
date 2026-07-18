import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { X, ExternalLink } from 'lucide-react';
import { useExtensionDetection } from '../../hooks/useExtensionDetection';

export default function SmartBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const isExtensionInstalled = useExtensionDetection();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // Check if the banner has been dismissed previously
    const hasDismissed = localStorage.getItem('hasDismissedExtensionBanner');
    if (!hasDismissed && isHomePage) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isHomePage]);

  const handleDismiss = () => {
    localStorage.setItem('hasDismissedExtensionBanner', 'true');
    setIsVisible(false);
  };

  if (!isVisible || isExtensionInstalled) return null;

  return (
    <div className="bg-black dark:bg-white text-white dark:text-black px-4 py-3 relative z-50 transition-all border-b border-gray-800 dark:border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 pr-8 sm:pr-0">
        <p className="text-sm font-medium text-center">
          Convert files without leaving your current tab. 
          <Link to="/extension" className="inline-flex items-center gap-1 font-bold ml-2 underline hover:opacity-80 transition-opacity">
            Download the DocMint Edge Extension
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </p>
        <button 
          onClick={handleDismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 dark:hover:bg-black/10 rounded-full transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
