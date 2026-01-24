import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { COLORS } from '../../utils/constants';

export default function ToolCard({ tool }) {
  const IconComponent = Icons[tool.icon] || Icons.File;

  return (
    <Link
      to={`/convert/${tool.id}`}
      className={`tool-card card card-hover p-8 flex flex-col items-center text-center group h-full transition-all duration-300 cursor-pointer`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
      }}
    >
      {/* Icon container */}
      <div 
        className={`
          p-4 rounded-2xl mb-4
          bg-white dark:bg-black
          border-2 border-gray-200 dark:border-neutral-border
          group-hover:scale-110 group-hover:border-black dark:group-hover:border-white transition-all duration-300
        `}
      >
        <IconComponent 
          className={`w-8 h-8 text-black dark:text-white`} 
          strokeWidth={1.5}
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        {tool.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {tool.description}
      </p>

      {/* Hover indicator */}
      <div className={`
        mt-4 px-4 py-1.5 rounded-full text-xs font-medium
        bg-black dark:bg-white text-white dark:text-black
        opacity-0 group-hover:opacity-100
        transform translate-y-2 group-hover:translate-y-0
        transition-all duration-300
      `}>
        Convert Now →
      </div>
    </Link>
  );
}
