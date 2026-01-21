import { useState } from 'react';

export default function PageRangeSelector({ value, onChange }) {
  const [mode, setMode] = useState(value?.mode || 'all');
  const [customRange, setCustomRange] = useState(value?.range || '');

  const handleModeChange = (newMode) => {
    setMode(newMode);
    onChange({ mode: newMode, range: newMode === 'custom' ? customRange : null });
  };

  const handleRangeChange = (e) => {
    const range = e.target.value;
    setCustomRange(range);
    onChange({ mode, range });
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Page Range
      </label>

      <div className="space-y-3">
        {/* All pages option */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="pageRange"
            checked={mode === 'all'}
            onChange={() => handleModeChange('all')}
            className="w-4 h-4 text-primary-500 focus:ring-primary-500"
          />
          <span className="text-gray-700 dark:text-gray-200">All pages</span>
        </label>

        {/* Custom range option */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="radio"
            name="pageRange"
            checked={mode === 'custom'}
            onChange={() => handleModeChange('custom')}
            className="w-4 h-4 mt-1 text-primary-500 focus:ring-primary-500"
          />
          <div className="flex-1">
            <span className="text-gray-700 dark:text-gray-200">Custom range</span>
            {mode === 'custom' && (
              <div className="mt-2">
                <input
                  type="text"
                  value={customRange}
                  onChange={handleRangeChange}
                  placeholder="e.g., 1-5, 8, 10-12"
                  className="input text-sm"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Enter page numbers or ranges separated by commas
                </p>
              </div>
            )}
          </div>
        </label>
      </div>
    </div>
  );
}
