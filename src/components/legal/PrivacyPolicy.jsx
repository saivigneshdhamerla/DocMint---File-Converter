import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <div className="card p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
          Privacy <span className="text-gradient">Policy</span>
        </h1>
        
        <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to DocMint. We are committed to protecting your personal information and your right to privacy. 
              This Privacy Policy explains how we handle your data when you use our file conversion services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">2. File Security & Data Handling</h2>
            <p className="mb-4">
              Your privacy is our top priority. We implement strict data handling procedures:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Zero Permanent Storage:</strong> We do not store your files permanently. All uploaded and converted files are automatically and permanently deleted from our servers after 60 minutes.</li>
              <li><strong>Secure Processing:</strong> Files are processed using encrypted connections (HTTPS/SSL).</li>
              <li><strong>No File Access:</strong> Our team does not manually review or access your files under any circumstances.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">3. Data We Collect</h2>
            <p>
              DocMint is designed to be used without registration. We do not collect personal information such as names, 
              email addresses, or phone numbers unless you explicitly provide them through our contact form.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">4. Third-Party Services</h2>
            <p>
              We use the iLovePDF API to provide high-quality file conversion. When you use our tools, your files are 
              temporarily transferred to their secure infrastructure for processing and are subject to their privacy guidelines 
              during that brief window.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">5. Updates to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. The updated version will be indicated by an updated 
              "Revised" date and will be effective as soon as it is accessible.
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
