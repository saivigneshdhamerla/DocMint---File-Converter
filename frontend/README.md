# DocMint v2.1 - Free Online File Conversion

A premium, modern React web application for high-quality file conversions using Firebase and the iLovePDF API. Completely free to use with no registration required.

![DocMint Preview](https://via.placeholder.com/800x400?text=DocMint+v2.0+File+Converter)

## 🎉 What's New in v2.1

### 📱 Mobile Download Innovation
- **QR Code Downloads** - Scan a QR code to instantly download converted files to your mobile device
  - Direct download to phone (no preview, no extra clicks)
  - Automatic filename preservation
  - Respects 1-hour file expiration
  - Beautiful modal interface with monochrome QR codes
  - Perfect for quick mobile transfers without cloud services

### 🎨 UI Polish
- **Home Page Search** - Find conversion tools quickly with search bar and category filters
- **404 Page Enhancement** - Single-viewport error page with tool suggestions
- **Hidden Scrollbars** - Cleaner interface while maintaining full scroll functionality
- **Refined Spacing** - Optimized layouts for better visual hierarchy

---

## 🎉 What's New in v2.0

### ✨ Enhanced UI/UX
- **Modernized Design System** - Refined monochrome theme with premium aesthetics
- **Dark Mode Optimization** - Improved contrast and readability in dark mode
- **Smoother Animations** - Enhanced transitions and micro-interactions
- **Better Mobile Experience** - Improved responsive layouts for all screen sizes

### 🚀 New Features
- **OCR Language Selector** - Multi-select dropdown with 30+ languages for improved text recognition accuracy
  - Search functionality to find languages quickly
  - Tag-based display with easy add/remove
  - Supports: English, Spanish, French, German, Japanese, Chinese, Korean, Arabic, Hindi, and 20+ more
- **Enhanced Error Messages** - Actionable error feedback with specific troubleshooting suggestions
- **Improved Split PDF** - Fixed "All pages" extraction mode
- **Better Compression** - Optimized compression quality mapping

### 🔧 Technical Improvements
- Streamlined project structure (removed duplicate configurations)
- Improved Firebase deployment configuration
- Enhanced iLovePDF API integration with proper authentication
- Better options mapping between frontend and backend

---

## ✨ Key Features

- **12+ Professional Tools**: Office to PDF, PDF to JPG, PDF OCR, Add Page Numbers, Image to PDF, Compress, Merge, Split, Rotate, Protect, Unlock, and Watermark.
- **QR Code Downloads**: Scan a QR code to instantly download files to your phone - no cloud uploads needed!
- **Modern UX/UI**: Sleek monochrome design with premium navigation and smooth animations.
- **Tool Discovery**: Search bar and category filters to find the perfect conversion tool quickly.
- **No Registration**: Start converting immediately without an account.
- **Privacy First**: Files are auto-deleted from our servers after **1 hour**. No manual access to your data.
- **Direct Downloads**: Files save directly to your machine with a clean naming convention: `{original-name}-docmint.{ext}`.
- **Meaningful Feedback**: Smart error message system that provides actionable troubleshooting suggestions.
- **Mobile Responsive**: Fully optimized for desktops, tablets, and smartphones.
- **Generous Limits**: Up to **50 free conversions per day**.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS (Custom Design System), Lucide Icons, QRCode.js
- **Backend**: Firebase Cloud Functions (Node.js 20)
- **Database**: Cloud Firestore (Rate limits, Stats, Feedback)
- **Storage**: Firebase Cloud Storage (Secure temporary storage)
- **API**: iLovePDF REST API

## 📂 Project Structure

```
DocMint/
├── frontend/          # React Vite application
│   ├── src/
│   │   ├── components/  # Modal, UI, Converter, Legal components
│   │   ├── hooks/       # Custom hooks (File Upload, Conversion)
│   │   ├── services/    # Firebase & API integration
│   │   ├── utils/       # Constants and helper functions
│   └── public/
├── functions/         # Firebase Cloud Functions (Conversion Logic)
│   └── src/
│       ├── ilovepdf/    # API Client Wrapper
│       └── middleware/  # Rate limiting & Security logic
└── firebase/          # Security rules & Configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Firebase CLI (`npm install -g firebase-tools`)
- iLovePDF API keys (Public & Secret)

### 1. Installation
```bash
# Frontend
cd frontend && npm install

# Functions
cd ../functions && npm install
```

### 2. Configuration
Create `.env` files:

**frontend/.env**
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**functions/.env**
```env
ILOVEPDF_PUBLIC_KEY=your_public_key
ILOVEPDF_SECRET_KEY=your_secret_key
RATE_LIMIT_MAX=50
```

### 3. Run Locally
```bash
# Start frontend
cd frontend && npm run dev
```
Open `http://localhost:5173` to view the app.

### 4. Deploy
```bash
# Deploy functions (from root directory)
firebase deploy --only functions

# Deploy hosting (from frontend directory)
cd frontend && npm run build && firebase deploy --only hosting
```

## 📑 Available Tools & Tasks

| Tool | ID | Description |
|------|----|-------------|
| **Office to PDF** | `office-to-pdf` | Convert Word, Excel, PPT to PDF |
| **PDF to JPG** | `pdf-to-jpg` | Extract pages as high-quality images |
| **PDF OCR** | `pdf-ocr` | Make scanned PDFs searchable (with language selection) |
| **Add Page Numbers** | `add-page-numbers` | Customize page numbering |
| **Image to PDF** | `image-to-pdf` | Convert JPG, PNG, TIFF to PDF |
| **Compress PDF** | `compress-pdf` | Reduce file size without losing quality |
| **Merge PDF** | `merge-pdf` | Combine multiple files into one |
| **Split PDF** | `split-pdf` | Extract specific page ranges |
| **Rotate PDF** | `rotate-pdf` | Change page orientation |
| **Protect PDF** | `protect-pdf` | Secure your PDF with a password |
| **Unlock PDF** | `unlock-pdf` | Remove password protection |
| **Watermark PDF** | `watermark-pdf` | Add custom text watermarks |

## 🛡 Security & Privacy

- **No Permanent Storage**: All files are stored in a secure UUID-indexed bucket and deleted automatically after 60 minutes.
- **Secure Processing**: Conversions are handled via encrypted API calls.
- **Data Protection**: We do not read, share, or sell your file content.
- **Rate Limiting**: 50 conversions per 24 hours per IP to ensure service availability for everyone.

## 📝 Version History

| Version | Release | Highlights |
|---------|---------|------------|
| **v2.1** | Feb 2026 | QR code downloads, home page search/filters, UI polish, hidden scrollbars |
| **v2.0** | Jan 2026 | Enhanced UI/UX, OCR language selector, improved error handling, bug fixes |
| **v1.0** | Dec 2025 | Initial release with 12+ conversion tools |

## 🤝 Feedback & Support

Have a suggestion or found a bug? Use our **Contact Page** to send feedback directly to our team. Feedback is stored securely in Firestore and reviewed regularly.

---

**DocMint v2.1** - Simplified File Management.

*Live Link* - https://docmint.netlify.app/