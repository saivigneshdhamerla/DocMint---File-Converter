import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ErrorMessage({ 
  title = 'Something went wrong',
  message = 'An error occurred during the conversion. Please try again.',
  suggestions = [],
  onRetry
}) {
  return (
    <div className="card p-6 md:p-8 text-center animate-fade-in border-red-100 dark:border-red-900/30">
      {/* Error icon */}
      <div className="inline-flex p-4 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
        <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>

      {/* Error content */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto whitespace-pre-line">
        {message}
      </p>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="text-left bg-gray-50 dark:bg-dark-tertiary p-4 rounded-xl mb-6 max-w-md mx-auto border border-gray-100 dark:border-gray-800">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Suggestions:</p>
          <ul className="space-y-2">
            {suggestions.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="text-black dark:text-white font-bold">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        )}
        <Link
          to="/"
          className="btn-secondary flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
