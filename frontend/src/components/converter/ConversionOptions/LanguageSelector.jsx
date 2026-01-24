import { useState } from 'react';
import { X, ChevronDown, Languages } from 'lucide-react';

// Common OCR languages supported by iLovePDF
const availableLanguages = [
  { code: 'eng', name: 'English' },
  { code: 'spa', name: 'Spanish' },
  { code: 'fra', name: 'French' },
  { code: 'deu', name: 'German' },
  { code: 'ita', name: 'Italian' },
  { code: 'por', name: 'Portuguese' },
  { code: 'nld', name: 'Dutch' },
  { code: 'rus', name: 'Russian' },
  { code: 'jpn', name: 'Japanese' },
  { code: 'zho', name: 'Chinese (Simplified)' },
  { code: 'kor', name: 'Korean' },
  { code: 'ara', name: 'Arabic' },
  { code: 'hin', name: 'Hindi' },
  { code: 'tha', name: 'Thai' },
  { code: 'vie', name: 'Vietnamese' },
  { code: 'pol', name: 'Polish' },
  { code: 'tur', name: 'Turkish' },
  { code: 'ukr', name: 'Ukrainian' },
  { code: 'ces', name: 'Czech' },
  { code: 'dan', name: 'Danish' },
  { code: 'fin', name: 'Finnish' },
  { code: 'ell', name: 'Greek' },
  { code: 'heb', name: 'Hebrew' },
  { code: 'hun', name: 'Hungarian' },
  { code: 'ind', name: 'Indonesian' },
  { code: 'nor', name: 'Norwegian' },
  { code: 'ron', name: 'Romanian' },
  { code: 'swe', name: 'Swedish' },
  { code: 'tel', name: 'Telugu' },
  { code: 'tam', name: 'Tamil' },
];

export default function LanguageSelector({ value, onChange }) {
  const [selectedLanguages, setSelectedLanguages] = useState(
    value || ['eng']
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleLanguage = (code) => {
    let newSelection;
    if (selectedLanguages.includes(code)) {
      // Remove if already selected (but keep at least one)
      if (selectedLanguages.length > 1) {
        newSelection = selectedLanguages.filter(lang => lang !== code);
      } else {
        return; // Don't allow removing the last language
      }
    } else {
      // Add to selection
      newSelection = [...selectedLanguages, code];
    }
    setSelectedLanguages(newSelection);
    onChange(newSelection);
  };

  const removeLanguage = (code) => {
    if (selectedLanguages.length > 1) {
      const newSelection = selectedLanguages.filter(lang => lang !== code);
      setSelectedLanguages(newSelection);
      onChange(newSelection);
    }
  };

  const getLanguageName = (code) => {
    return availableLanguages.find(lang => lang.code === code)?.name || code;
  };

  const filteredLanguages = availableLanguages.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Languages className="w-5 h-5 text-gray-500" />
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Document Languages
        </label>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Select the languages in your document for better OCR accuracy
      </p>

      {/* Selected languages tags */}
      <div className="flex flex-wrap gap-2 min-h-[36px]">
        {selectedLanguages.map((code) => (
          <span
            key={code}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm border border-black dark:border-white"
          >
            {getLanguageName(code)}
            {selectedLanguages.length > 1 && (
              <button
                onClick={() => removeLanguage(code)}
                className="ml-1 hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </span>
        ))}
      </div>

      {/* Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-dark-tertiary border-2 border-gray-300 dark:border-neutral-border rounded-xl text-left hover:bg-gray-100 dark:hover:bg-dark-secondary transition-colors"
        >
          <span className="text-gray-600 dark:text-gray-300">
            Add more languages...
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white dark:bg-dark-tertiary border-2 border-gray-300 dark:border-neutral-border rounded-xl shadow-xl max-h-64 overflow-hidden">
            {/* Search input */}
            <div className="p-2 border-b border-gray-300 dark:border-neutral-border">
              <input
                type="text"
                placeholder="Search languages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 dark:bg-dark-secondary border-none rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-text focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
                autoFocus
              />
            </div>

            {/* Language list */}
            <div className="max-h-48 overflow-y-auto">
              {filteredLanguages.map((lang) => {
                const isSelected = selectedLanguages.includes(lang.code);
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleToggleLanguage(lang.code)}
                    className={`
                      w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors
                      ${isSelected 
                        ? 'bg-gray-100 dark:bg-dark-secondary text-black dark:text-white font-medium' 
                        : 'hover:bg-gray-50 dark:hover:bg-dark-secondary text-gray-700 dark:text-gray-200'
                      }
                    `}
                  >
                    <span className="text-sm">{lang.name}</span>
                    {isSelected && (
                      <span className="text-xs bg-black dark:bg-white text-white dark:text-black px-2 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
