import { Sparkles, Shield, Zap, Clock } from 'lucide-react';
import ToolsGrid from './ToolsGrid';
import StatsCounter from './StatsCounter';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Convert files in seconds with our optimized processing',
  },
  {
    icon: Shield,
    title: '100% Secure',
    description: 'Files are automatically deleted after 1 hour',
  },
  {
    icon: Sparkles,
    title: 'Free Forever',
    description: 'No registration, no hidden fees, completely free',
  },
  {
    icon: Clock,
    title: '24/7 Available',
    description: 'Access our tools anytime, anywhere',
  },
];

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent/5 dark:from-dark dark:via-dark-secondary dark:to-dark-tertiary" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 dark:bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 dark:bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              <span className="text-gray-900 dark:text-white">Convert Files </span>
              <span className="text-gradient">Instantly</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Transform PDFs, documents with our free, secure, and lightning-fast converter. 
              No registration required.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="flex flex-col items-center p-4 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-3 rounded-xl bg-white dark:bg-dark-secondary shadow-lg mb-3">
                    <feature.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
      <section className="bg-gray-50 dark:bg-dark-secondary/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Why Choose Our Converter?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              We make file conversion simple, fast, and safe. 
              No catch, no cost—just great results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {/* Feature 1 */}
            <div className="group p-6 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-dark-tertiary hover:shadow-xl border border-transparent hover:border-primary-100 dark:hover:border-primary-900/30">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-500 mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Safe & Private</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your files are protected. We use secure connections and 
                permanently delete everything you upload after 1 hour.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-dark-tertiary hover:shadow-xl border border-transparent hover:border-primary-100 dark:hover:border-primary-900/30">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-500 mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Great Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We make sure your files look exactly like the original. No messy layouts 
                or missing text—just perfect conversions every time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-dark-tertiary hover:shadow-xl border border-transparent hover:border-primary-100 dark:hover:border-primary-900/30">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-500 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Simple & Free</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No need to sign up or pay anything. Just upload your file, 
                convert it, and download your result in seconds.
              </p>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-800 flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-80 transition-all duration-500 text-[10px] tracking-[0.2em] font-black">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-tertiary rounded-full shadow-sm border border-gray-100 dark:border-gray-800 shine-silver">
              <Shield className="w-3 h-3 text-primary-500" />
              <span className="text-gray-600 dark:text-gray-400 uppercase">Secure SSL</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-tertiary rounded-full shadow-sm border border-gray-100 dark:border-gray-800 shine-silver">
              <Shield className="w-3 h-3 text-primary-500" />
              <span className="text-gray-600 dark:text-gray-400 uppercase">Privacy First</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-tertiary rounded-full shadow-sm border border-gray-100 dark:border-gray-800 shine-silver">
              <Shield className="w-3 h-3 text-primary-500" />
              <span className="text-gray-600 dark:text-gray-400 uppercase">Fast Servers</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
