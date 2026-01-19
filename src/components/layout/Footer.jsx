import { Heart, FileType2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-dark-secondary border-t border-gray-200 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-600 to-accent group-hover:scale-110 transition-transform">
                <FileType2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-800 dark:text-white tracking-tight">DocMint</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Free online file conversion tools
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link 
              to="/privacy" 
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-accent fill-accent" />
            <span>© {currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
