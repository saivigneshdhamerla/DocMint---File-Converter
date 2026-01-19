
import ToolCard from './ToolCard';
import { CONVERSION_TOOLS } from '../../utils/constants';

export default function ToolsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {CONVERSION_TOOLS.map((tool, index) => (
        <div
          key={tool.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ToolCard tool={tool} />
        </div>
      ))}
    </div>
  );
}
