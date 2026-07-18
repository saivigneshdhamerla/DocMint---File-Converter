import { Download, Zap, QrCode, MousePointer2, FileType2 } from 'lucide-react';

export default function ExtensionPromo() {
  return (
    <div className="min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-24 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium text-sm border border-blue-100 dark:border-blue-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New Release
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Your workflow,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              interrupted never.
            </span>
          </h1>
          
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Convert PDFs and images directly from your browser toolbar. The DocMint Edge Add-on brings lightning-fast file conversion to any tab you're on.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="https://microsoftedge.microsoft.com/addons/detail/docmint-file-converter/jipobaaopidnaombafidfomejldkcpmm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-lg hover:scale-105 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <Download className="w-5 h-5" />
              Add to Microsoft Edge
            </a>
            <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
              100% Free. No sign-up required.
            </p>
          </div>
        </div>

        {/* Browser Mockup / Graphic */}
        <div className="relative mx-auto max-w-4xl mb-32 animate-fade-in group cursor-pointer" style={{ animationDelay: '100ms' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black to-transparent z-10 bottom-0 h-32 top-auto pointer-events-none"></div>
          
          <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden shadow-2xl bg-gray-50 dark:bg-dark-secondary relative transition-all duration-700 group-hover:shadow-blue-500/10 group-hover:border-gray-300 dark:group-hover:border-gray-700">
            
            {/* Fake browser header */}
            <div className="h-12 border-b-2 border-gray-200 dark:border-gray-800 flex items-center px-4 gap-2 bg-white dark:bg-black relative">
              <div className="flex gap-1.5 relative z-10">
                <div className="w-3 h-3 rounded-full bg-red-400 group-hover:bg-red-500 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400 group-hover:bg-amber-500 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 group-hover:bg-green-500 transition-colors"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-1/2 h-6 bg-gray-100 dark:bg-gray-900 rounded-md flex items-center justify-center text-[10px] text-gray-400 font-mono transition-colors group-hover:bg-gray-200 dark:group-hover:bg-gray-800 group-hover:text-gray-500 dark:group-hover:text-gray-300">
                  edge://extensions/docmint
                </div>
              </div>
            </div>
            
            {/* Fake browser content with the popup opening */}
            <div className="p-8 h-64 md:h-96 flex items-start justify-end bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-tertiary dark:to-black relative overflow-hidden">
              
              {/* Fake Webpage on the Left */}
              <div className="absolute inset-0 p-8 sm:p-12 flex flex-col gap-6 pointer-events-none opacity-60 dark:opacity-40">
                {/* Website Skeleton Header & Text */}
                <div className="w-1/3 max-w-[200px] h-6 bg-gray-300 dark:bg-gray-700/50 rounded-md"></div>
                <div className="w-1/2 max-w-[300px] space-y-3">
                  <div className="w-full h-3 bg-gray-300 dark:bg-gray-700/50 rounded"></div>
                  <div className="w-5/6 h-3 bg-gray-300 dark:bg-gray-700/50 rounded"></div>
                  <div className="w-4/6 h-3 bg-gray-300 dark:bg-gray-700/50 rounded"></div>
                </div>
                
                {/* Original stationary file that disappears on hover */}
                <div className="absolute top-1/2 left-1/4 -translate-y-12 w-16 h-20 bg-white dark:bg-dark-secondary rounded-lg border-2 border-dashed border-gray-400 dark:border-gray-600 flex flex-col items-center justify-center gap-1 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <FileType2 className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                  <div className="w-8 h-1.5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
              
              {/* Floating element mimicking a file being dragged */}
              <div className="absolute top-1/2 left-1/4 w-16 h-20 bg-white dark:bg-dark-secondary rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-[1500ms] ease-out -translate-y-12 translate-x-0 group-hover:translate-x-48 group-hover:translate-y-12 group-hover:rotate-12 z-20 flex items-center justify-center">
                 <FileType2 className="w-8 h-8 text-blue-500" />
              </div>

              <div className="w-64 sm:w-80 h-full bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden flex flex-col sm:translate-x-4 -translate-y-4 transition-transform duration-700 group-hover:-translate-y-6 z-10 group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]">
                 {/* Popup Header with DocMint Logo */}
                 <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                   <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center border-2 border-black dark:border-white group-hover:rotate-6 transition-transform duration-500">
                      <FileType2 className="w-5 h-5 text-white dark:text-black" />
                   </div>
                   <div>
                     <div className="h-3 w-20 bg-gray-900 dark:bg-white rounded mb-1.5"></div>
                     <div className="h-2 w-12 bg-gray-400 dark:bg-gray-500 rounded"></div>
                   </div>
                 </div>
                 
                 {/* Popup Content */}
                 <div className="p-4 space-y-3">
                   {/* Drop Zone */}
                   <div className="h-28 w-full bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border-2 border-dashed border-blue-200 dark:border-blue-800 flex flex-col items-center justify-center gap-2 transition-all duration-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 group-hover:border-blue-400 dark:group-hover:border-blue-500 group-hover:scale-[1.02]">
                     <MousePointer2 className="w-5 h-5 text-blue-400 transition-all duration-[1200ms] ease-out translate-y-4 translate-x-4 opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:scale-90" />
                     <span className="text-xs text-blue-500 font-bold transition-all duration-500 group-hover:scale-105">Drop file to convert</span>
                   </div>
                   
                   {/* Fake Buttons / Settings */}
                   <div className="grid grid-cols-2 gap-2 mt-4">
                     <div className="h-10 w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg flex items-center px-3 gap-2">
                       <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
                       <div className="h-2 w-12 bg-gray-200 dark:bg-gray-700 rounded transition-all duration-500 group-hover:w-16"></div>
                     </div>
                     <div className="h-10 w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg flex items-center px-3 gap-2">
                       <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
                       <div className="h-2 w-12 bg-gray-200 dark:bg-gray-700 rounded transition-all duration-500 group-hover:w-14"></div>
                     </div>
                   </div>
                   
                   <div className="h-12 w-full bg-black dark:bg-white rounded-xl mt-4 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "Instant Access",
              desc: "No more searching for bookmarks. Your favorite converter is always one click away in your toolbar."
            },
            {
              icon: MousePointer2,
              title: "Drag & Drop Magic",
              desc: "Found an image online? Just drag it directly into the extension popup to start converting instantly."
            },
            {
              icon: QrCode,
              title: "Scan to Mobile",
              desc: "Converting on PC but need the file on your phone? Generate a QR code instantly to download it straight to mobile."
            }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-dark-secondary border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors animate-fade-in" style={{ animationDelay: `${200 + (i * 100)}ms` }}>
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-6 text-black dark:text-white shadow-sm">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
