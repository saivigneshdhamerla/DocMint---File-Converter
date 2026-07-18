import { useState, useEffect } from 'react';

export function useExtensionDetection() {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Check if the DOM element or attribute already exists (in case content script ran before React mounted)
    if (document.getElementById('docmint-extension-installed') || document.documentElement.hasAttribute('data-docmint-extension')) {
      setIsInstalled(true);
      return;
    }

    // 2. Listen for a custom event from the extension
    const handleExtensionInstalled = () => {
      setIsInstalled(true);
    };

    window.addEventListener('docmint-extension-installed', handleExtensionInstalled);

    return () => {
      window.removeEventListener('docmint-extension-installed', handleExtensionInstalled);
    };
  }, []);

  return isInstalled;
}
