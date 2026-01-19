import { useState } from 'react';

export default function WatermarkSettings({ value, onChange }) {
  const [text, setText] = useState(value?.text || '');
  const [position, setPosition] = useState(value?.position || 'center');
  const [opacity, setOpacity] = useState(value?.opacity || 50);

  const handleChange = (updates) => {
    const newValue = {
      text,
      position,
      opacity,
      ...updates
    };
    onChange(newValue);
  };

  const positions = [
    { id: 'top-left', label: '↖' },
    { id: 'top', label: '↑' },
    { id: 'top-right', label: '↗' },
    { id: 'left', label: '←' },
    { id: 'center', label: '●' },
    { id: 'right', label: '→' },
    { id: 'bottom-left', label: '↙' },
    { id: 'bottom', label: '↓' },
    { id: 'bottom-right', label: '↘' },
  ];

  return (
    <div className="space-y-6">
      {/* Text input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Watermark Text
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            handleChange({ text: e.target.value });
          }}
          placeholder="Enter watermark text..."
          className="input"
          maxLength={50}
        />
      </div>

      {/* Position selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Position
        </label>
        <div className="grid grid-cols-3 gap-2 w-36">
          {positions.map((pos) => (
            <button
              key={pos.id}
              onClick={() => {
                setPosition(pos.id);
                handleChange({ position: pos.id });
              }}
              className={`
                aspect-square rounded-lg border-2 text-lg font-bold transition-all
                ${position === pos.id 
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600' 
                  : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:border-gray-300'
                }
              `}
            >
              {pos.label}
            </button>
          ))}
        </div>
      </div>

      {/* Opacity slider */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Opacity: {opacity}%
        </label>
        <input
          type="range"
          min="10"
          max="100"
          step="10"
          value={opacity}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setOpacity(val);
            handleChange({ opacity: val });
          }}
          className="w-full h-2 bg-gray-200 dark:bg-dark-tertiary rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Light</span>
          <span>Bold</span>
        </div>
      </div>
    </div>
  );
}
