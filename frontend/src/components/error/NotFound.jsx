import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, FileText } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  const popularTools = [
    { id: 'office-to-pdf', name: 'PDF to Word', path: '/convert/office-to-pdf' },
    { id: 'pdf-to-jpg', name: 'JPG to PDF', path: '/convert/pdf-to-jpg' },
    { id: 'compress-pdf', name: 'Compress PDF', path: '/convert/compress-pdf' },
    { id: 'merge-pdf', name: 'Merge PDF', path: '/convert/merge-pdf' },
  ];

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleToolClick = (path) => {
    navigate(path);
  };

  return (
    <div className="flex items-center justify-center px-4 py-6 bg-gray-50 dark:bg-dark" style={{ minHeight: 'calc(100vh - 140px)' }}>
      <div className="w-full max-w-4xl mx-auto">
        {/* 404 Error Display */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-7xl md:text-8xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
              4
            </span>
            <div className="animate-bounce">
              <FileText 
                className="w-16 h-16 md:w-20 md:h-20 text-gray-400 dark:text-gray-500" 
                strokeWidth={1.5}
              />
            </div>
            <span className="text-7xl md:text-8xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
              4
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Page Not Found
          </h1>
          
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6">
            Oops! The page you're looking for doesn't exist. It might have been moved or the URL might be incorrect.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <button
              onClick={handleGoHome}
              className="group relative px-6 py-3 bg-white dark:bg-black text-black dark:text-white 
                       border-2 border-black dark:border-white rounded-lg font-semibold
                       hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black
                       transform hover:scale-105 active:scale-95 transition-all duration-200
                       shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go to Home
            </button>

            <button
              onClick={handleGoBack}
              className="group relative px-6 py-3 bg-transparent text-gray-700 dark:text-gray-300
                       border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold
                       hover:bg-gray-100 dark:hover:bg-dark-secondary
                       transform hover:scale-105 active:scale-95 transition-all duration-200
                       flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>

        {/* Popular Tools Section */}
        <div className="border-t border-gray-200 dark:border-neutral-border pt-6">
          <h2 className="text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
            Or try one of our popular tools:
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {popularTools.map((tool, index) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.path)}
                className="group relative px-4 py-3 bg-white dark:bg-dark-secondary 
                         border-2 border-gray-200 dark:border-neutral-border rounded-lg
                         hover:border-black dark:hover:border-white
                         transform hover:-translate-y-1 hover:shadow-xl
                         transition-all duration-300 select-none"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
                    {tool.name}
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}
