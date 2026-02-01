import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Shield, Zap, Clock, ChevronDown } from 'lucide-react';
import ToolsGrid from './ToolsGrid';
import StatsCounter from './StatsCounter';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Convert files in seconds',
  },
  {
    icon: Shield,
    title: '100% Secure',
    description: 'Auto-deleted after 1 hour',
  },
  {
    icon: Sparkles,
    title: 'Free Forever',
    description: 'No registration required',
  },
  {
    icon: Clock,
    title: '24/7 Available',
    description: 'Always ready to convert',
  },
];

export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center">
        {/* Solid background */}
        <div className="absolute inset-0 bg-white dark:bg-black" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              <span className="text-gray-900 dark:text-white">Convert Files Instantly</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-neutral-text mb-10 font-light leading-relaxed">
              Free, secure, instant file conversion.
            </p>

            <a 
              href="#tools" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-black dark:bg-white text-white dark:text-black rounded-lg hover:scale-105 transition-transform duration-200 min-h-[44px]"
            >
              Start Converting
              <ChevronDown className="w-5 h-5" />
            </a>

            {/* Features grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="flex flex-col items-center animate-slide-up select-none"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-3 rounded-xl bg-white dark:bg-black border-2 border-gray-200 dark:border-neutral-border mb-3">
                    <feature.icon className="w-7 h-7 text-black dark:text-white" strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCounter />
      </section> */}

      {/* Tools Section */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-11 scroll-mt-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
            Choose Your Conversion Tool
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Select from our comprehensive suite of file conversion tools
          </p>
        </div>
        <ToolsGrid />
      </section>

      {/* Trust & Features Section */}
      <section className="bg-gray-50 dark:bg-dark-secondary/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
              Why Choose DocMint?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-white dark:bg-dark border-2 border-gray-200 dark:border-neutral-border hover:border-black dark:hover:border-white hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-black border-2 border-gray-200 dark:border-neutral-border group-hover:border-black dark:group-hover:border-white flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                  <Shield className="w-8 h-8 text-black dark:text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Safe & Private</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Secure connections. Auto-delete after 1 hour.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-white dark:bg-dark border-2 border-gray-200 dark:border-neutral-border hover:border-black dark:hover:border-white hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-black border-2 border-gray-200 dark:border-neutral-border group-hover:border-black dark:group-hover:border-white flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                  <Sparkles className="w-8 h-8 text-black dark:text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Great Quality</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Perfect conversions. No messy layouts.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-white dark:bg-dark border-2 border-gray-200 dark:border-neutral-border hover:border-black dark:hover:border-white hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-black border-2 border-gray-200 dark:border-neutral-border group-hover:border-black dark:group-hover:border-white flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                  <Zap className="w-8 h-8 text-black dark:text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Simple & Free</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Upload, convert, download. Always free.
                </p>
              </div>
            </div>
          </div>

        {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6">
              About DocMint File Converter
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              DocMint is a free online file converter that allows users to convert
              documents and images quickly without installing any software.
              It supports PDF, Word, Excel, and image formats with secure processing.
            </p>
          </div>
        </div>
      </section>

          {/* Trust badges */}
          <div className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800 flex flex-wrap justify-center items-center gap-8 opacity-50 select-none">
            <div className="shine flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-dark-tertiary rounded-full border border-gray-200 dark:border-gray-800">
              <Shield className="w-4 h-4 text-black dark:text-white" />
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Secure SSL</span>
            </div>
            <div className="shine flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-dark-tertiary rounded-full border border-gray-200 dark:border-gray-800">
              <Shield className="w-4 h-4 text-black dark:text-white" />
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Privacy First</span>
            </div>
            <div className="shine flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-dark-tertiary rounded-full border border-gray-200 dark:border-gray-800">
              <Shield className="w-4 h-4 text-black dark:text-white" />
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Fast Servers</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
