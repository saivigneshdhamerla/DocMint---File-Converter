import { useState } from 'react';
import { Search, Puzzle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ToolCard from './ToolCard';
import { CONVERSION_TOOLS } from '../../utils/constants';
import { useExtensionDetection } from '../../hooks/useExtensionDetection';

const categories = [
  { id: 'all', label: 'All Tools' },
  { id: 'pdf', label: 'PDF' },
  { id: 'office', label: 'Office' },
  { id: 'image', label: 'Image' },
];

export default function ToolsGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isExtensionInstalled = useExtensionDetection();

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
          
          {/* Inject promo card at the end if showing all tools and no search */}
          {selectedCategory === 'all' && searchQuery === '' && !isExtensionInstalled && (
            <Link
              to="/extension"
              className="animate-fade-in group relative p-6 bg-transparent rounded-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.04)] hover:-translate-y-1 overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-solid hover:border-black dark:hover:border-white flex flex-col justify-between min-h-[160px] h-full"
              style={{ animationDelay: `${filteredTools.length * 50}ms` }}
            >
              {/* Subtle background glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent dark:from-dark-tertiary dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-dark-secondary rounded-xl flex items-center justify-center text-black dark:text-white border border-gray-200 dark:border-gray-700 group-hover:scale-105 transition-transform duration-300">
                    <Puzzle className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-black text-white dark:bg-white dark:text-black rounded-full shadow-sm">
                    Free
                  </span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight transition-colors">
                    Edge Extension
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    Convert files instantly from your browser toolbar. No tab switching required.
                  </p>
                </div>
                
                <div className="flex items-center text-sm font-semibold text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform duration-300 mt-auto">
                  Get the Add-on
                  <ArrowRight className="w-4 h-4 ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </Link>
          )}
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
