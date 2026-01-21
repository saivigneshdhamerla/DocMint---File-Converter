import { useState } from 'react';
import { RotateCw } from 'lucide-react';

const rotationOptions = [
  { value: 90, label: '90°' },
  { value: 180, label: '180°' },
  { value: 270, label: '270°' },
];

export default function RotationSelector({ value, onChange }) {
  const [selected, setSelected] = useState(value || 90);

  const handleSelect = (rotation) => {
    setSelected(rotation);
    onChange(rotation);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Rotation Angle
      </label>

      <div className="flex gap-3">
        {rotationOptions.map((option) => {
          const isSelected = selected === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                flex-1 p-4 rounded-xl border-2 text-center transition-all
                ${isSelected 
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              <div className="relative inline-block mb-2">
                <RotateCw 
                  className={`
                    w-8 h-8 transition-transform
                    ${isSelected ? 'text-primary-500' : 'text-gray-400'}
                  `}
                  style={{ transform: `rotate(${option.value}deg)` }}
                />
              </div>
              <p className={`
                font-semibold
                ${isSelected ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}
              `}>
                {option.label}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Clockwise
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
