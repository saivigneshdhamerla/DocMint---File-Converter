import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { COLORS } from '../../utils/constants';

export default function ToolCard({ tool }) {
  const IconComponent = Icons[tool.icon] || Icons.File;
  const colors = COLORS[tool.color] || COLORS.blue;

  return (
    <Link
      to={`/convert/${tool.id}`}
      className={`tool-card card card-hover p-8 flex flex-col items-center text-center group h-full transition-all duration-300`}
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
          ${colors.bg} ${colors.border}
          border
          group-hover:scale-110 transition-transform duration-300
        `}
      >
        <IconComponent 
          className={`w-8 h-8 ${colors.text}`} 
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
        ${colors.bg} ${colors.text}
        opacity-0 group-hover:opacity-100
        transform translate-y-2 group-hover:translate-y-0
        transition-all duration-300
      `}>
        Convert Now →
      </div>
    </Link>
  );
}
