import { Link } from 'react-router-dom';
import { Sun, Moon, FileType2, Github } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary-600 to-accent transform group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-primary-500/20">
              <FileType2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-gradient">Doc</span>
              <span className="text-gray-800 dark:text-gray-100">Mint</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-white/10 dark:bg-black/20 p-1.5 rounded-2xl border border-white/20 dark:border-gray-800/30 backdrop-blur-xl shadow-inner">
            {[
              { id: 'merge-pdf', name: 'Merge' },
              { id: 'split-pdf', name: 'Split' },
              { id: 'compress-pdf', name: 'Compress' },
              { id: 'office-to-pdf', name: 'Office to PDF' },
              { id: 'unlock-pdf', name: 'Unlock' },
            ].map((tool) => (
              <Link
                key={tool.id}
                to={`/convert/${tool.id}`}
                className="px-4 py-2 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white/80 dark:hover:bg-dark-tertiary transition-all duration-300 hover:shadow-sm"
              >
                {tool.name}
              </Link>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* GitHub link */}
            <a
              href="https://github.com/saivigneshdhamerla/DocMint---File-Converter"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-secondary hover:bg-gray-200 dark:hover:bg-dark-tertiary transition-all hover:scale-105 active:scale-95"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-secondary hover:bg-gray-200 dark:hover:bg-dark-tertiary transition-all duration-300"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
