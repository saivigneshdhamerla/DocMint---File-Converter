import React from 'react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <div className="card p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
          Terms of <span className="text-gradient">Service</span>
        </h1>
        
        <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using DocMint, you agree to comply with and be bound by these Terms of Service. 
              If you do not agree with any part of these terms, you must not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">2. Description of Service</h2>
            <p>
              DocMint provides online tools for file conversion, processing, and management. We provide these 
              services on an "as-is" and "as-available" basis without any warranties of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">3. User Responsibility</h2>
            <p className="mb-4">As a user of DocMint, you agree that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You own or have the necessary rights to the files you upload.</li>
              <li>You will not use the service for any illegal or unauthorized purpose.</li>
              <li>You understand that conversion results may vary depending on the file complexity and type.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">4. Limitation of Liability</h2>
            <p>
              DocMint and its developers shall not be liable for any direct, indirect, incidental, or consequential 
              damages resulting from the use or inability to use our services, including but not limited to 
              loss of data or file corruption during the conversion process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">5. Automatic File Deletion</h2>
            <p>
              Users acknowledge that all processed files are temporary. Files are automatically deleted from our 
              infrastructure after 60 minutes. It is the user's responsibility to download their files immediately 
              after conversion.
            </p>
          </section>

          <div className="pt-8 border-t border-gray-100 dark:border-gray-800 text-sm italic">
            Last updated: January 2026
          </div>
        </div>
      </div>
    </div>
  );
}
