import { useState } from 'react';
import { Zap, Scale, Sparkles } from 'lucide-react';

const qualityOptions = [
  { 
    id: 'low', 
    name: 'Low', 
    description: 'Smallest file size', 
    icon: Zap,
    color: 'green'
  },
  { 
    id: 'recommended', 
    name: 'Recommended', 
    description: 'Good balance', 
    icon: Scale,
    color: 'primary'
  },
  { 
    id: 'extreme', 
    name: 'Extreme', 
    description: 'Best quality', 
    icon: Sparkles,
    color: 'purple'
  },
];

export default function QualitySelector({ value, onChange }) {
  const [selected, setSelected] = useState(value || 'recommended');

  const handleSelect = (id) => {
    setSelected(id);
    onChange(id);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Compression Quality
      </label>

      <div className="grid grid-cols-3 gap-3">
        {qualityOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selected === option.id;
          
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`
                relative p-4 rounded-xl border-2 text-center transition-all
                ${isSelected 
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              <Icon className={`
                w-6 h-6 mx-auto mb-2
                ${isSelected ? 'text-primary-500' : 'text-gray-400'}
              `} />
              <p className={`
                font-medium text-sm
                ${isSelected ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}
              `}>
                {option.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {option.description}
              </p>

              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
