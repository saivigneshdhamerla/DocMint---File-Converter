import { Link, NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, FileType2, Github } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <div className="p-2 rounded-xl bg-white dark:bg-black border-2 border-black dark:border-white transform group-hover:rotate-6 transition-all duration-300">
              <FileType2 className="w-6 h-6 text-black dark:text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-black dark:text-white">Doc</span>
              <span className="text-gray-800 dark:text-gray-100">Mint</span>
            </span>
          </Link>

          {/* Desktop Navigation - Only on Home Page */}
          {isHomePage && (
            <nav className="hidden lg:flex items-center gap-1.5 bg-gray-100 dark:bg-dark-tertiary p-1.5 rounded-xl border-2 border-gray-200 dark:border-neutral-border">
              {[
                { id: 'merge-pdf', name: 'Merge' },
                { id: 'split-pdf', name: 'Split' },
                { id: 'compress-pdf', name: 'Compress' },
                { id: 'office-to-pdf', name: 'Office to PDF' },
                { id: 'unlock-pdf', name: 'Unlock' },
              ].map((tool) => (
                <NavLink
                  key={tool.id}
                  to={`/convert/${tool.id}`}
                  className={({ isActive }) => `
                    px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300
                    ${isActive 
                      ? 'bg-black dark:bg-white text-white dark:text-black' 
                      : 'text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-dark-secondary'
                    }
                  `}
                >
                  {tool.name}
                </NavLink>
              ))}
            </nav>
          )}

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* GitHub link */}
            <a
              href="https://github.com/saivigneshdhamerla/DocMint---File-Converter"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-dark-secondary hover:bg-gray-200 dark:hover:bg-dark-tertiary transition-all hover:scale-105 active:scale-95 border-2 border-transparent hover:border-black dark:hover:border-white"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5 text-black dark:text-white" />
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-dark-secondary hover:bg-gray-200 dark:hover:bg-dark-tertiary transition-all duration-300 border-2 border-transparent hover:border-black dark:hover:border-white"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-black" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
