import { Upload, Cog, Download, CheckCircle } from 'lucide-react';

const stages = [
  { id: 'uploading', label: 'Uploading', icon: Upload },
  { id: 'processing', label: 'Processing', icon: Cog },
  { id: 'complete', label: 'Complete', icon: CheckCircle },
];

export default function ProgressBar({ 
  stage, 
  progress = 0, 
  error = null 
}) {
  const currentStageIndex = stages.findIndex(s => s.id === stage);

  return (
    <div className="space-y-6">
      {/* Stage indicators */}
      <div className="flex items-center justify-between">
        {stages.map((s, index) => {
          const Icon = s.icon;
          const isActive = index === currentStageIndex;
          const isComplete = index < currentStageIndex;
          const isPending = index > currentStageIndex;

          return (
            <div key={s.id} className="flex flex-col items-center flex-1">
              <div className={`
                relative p-3 rounded-full mb-2 transition-all duration-500
                ${isActive 
                  ? 'bg-black dark:bg-white' 
                  : isComplete 
                    ? 'bg-green-500' 
                    : 'bg-gray-200 dark:bg-dark-tertiary'
                }
              `}>
                <Icon className={`
                  w-5 h-5 transition-colors
                  ${isActive 
                    ? 'text-white dark:text-black' 
                    : isComplete 
                      ? 'text-white' 
                      : 'text-gray-400 dark:text-gray-500'
                  }
                  ${isActive && s.id === 'processing' ? 'animate-spin-slow' : ''}
                `} />
                
                {/* Pulse effect for active stage */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-black dark:bg-white animate-ping opacity-25" />
                )}
              </div>

              <span className={`
                text-sm font-medium transition-colors
                ${isActive 
                  ? 'text-black dark:text-white' 
                  : isComplete 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-gray-400 dark:text-gray-500'
                }
              `}>
                {s.label}
              </span>

              {/* Connector line */}
              {index < stages.length - 1 && (
                <div className="absolute top-6 left-1/2 w-full h-0.5 -translate-y-1/2 hidden md:block">
                  <div className={`
                    h-full transition-all duration-500
                    ${index < currentStageIndex 
                      ? 'bg-green-500' 
                      : 'bg-gray-200 dark:bg-dark-tertiary'
                    }
                  `} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="relative h-2 rounded-full bg-gray-200 dark:bg-dark-tertiary overflow-hidden">
        <div 
          className={`
            h-full rounded-full transition-all duration-300 ease-out
            ${error 
              ? 'bg-red-500' 
              : stage === 'complete' 
                ? 'bg-green-500' 
                : 'bg-black dark:bg-white'
            }
          `}
          style={{ width: `${progress}%` }}
        />
        
        {/* Shimmer effect */}
        {stage !== 'complete' && !error && progress > 0 && (
          <div className="absolute inset-0 progress-bar-animated" />
        )}
      </div>

      {/* Progress text */}
      <div className="flex justify-between text-sm">
        <span className={`
          ${error 
            ? 'text-red-600 dark:text-red-400' 
            : 'text-gray-600 dark:text-gray-300'
          }
        `}>
          {error 
            ? 'Error occurred' 
            : stage === 'uploading' 
              ? 'Uploading file...' 
              : stage === 'processing' 
                ? 'Converting your file...' 
                : 'Conversion complete!'
          }
        </span>
        <span className="font-medium text-gray-800 dark:text-white">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
