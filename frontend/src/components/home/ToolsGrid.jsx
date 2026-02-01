import { useState } from 'react';
import { Search } from 'lucide-react';
import ToolCard from './ToolCard';
import { CONVERSION_TOOLS } from '../../utils/constants';

const categories = [
  { id: 'all', label: 'All Tools' },
  { id: 'pdf', label: 'PDF' },
  { id: 'office', label: 'Office' },
  { id: 'image', label: 'Image' },
];

export default function ToolsGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter tools based on search query and category
  const filteredTools = CONVERSION_TOOLS.filter((tool) => {
    // Search filter
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    let matchesCategory = true;
    if (selectedCategory === 'pdf') {
      matchesCategory = tool.id.includes('pdf') || tool.acceptedTypes.includes('.pdf');
    } else if (selectedCategory === 'office') {
      matchesCategory = tool.id === 'office-to-pdf';
    } else if (selectedCategory === 'image') {
      matchesCategory = tool.id.includes('image') || tool.id.includes('jpg');
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-dark-secondary 
                     border-2 border-gray-200 dark:border-neutral-border rounded-xl
                     text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:border-black dark:focus:border-white
                     transition-all duration-200"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 select-none
                     ${selectedCategory === category.id
                       ? 'bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white'
                       : 'bg-white dark:bg-dark-secondary text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-neutral-border hover:border-gray-400 dark:hover:border-gray-500'
                     }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => (
            <div
              key={tool.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No tools found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
