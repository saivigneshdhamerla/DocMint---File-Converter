# DocMint - Free Online File Conversion

A premium, modern React web application for high-quality file conversions using Firebase and the iLovePDF API. Completely free to use with no registration required.

![DocMint Preview](https://via.placeholder.com/800x400?text=DocMint+File+Converter)

## ✨ Key Features

- **12+ Professional Tools**: Office to PDF, PDF to JPG, PDF OCR, Add Page Numbers, Image to PDF, Compress, Merge, Split, Rotate, Protect, Unlock, and Watermark.
- **Modern UX/UI**: Sleek "Glassmorphism" design with a premium navigation bar and smooth animations.
- **No Registration**: Start converting immediately without an account.
- **Privacy First**: Files are auto-deleted from our servers after **1 hour**. No manual access to your data.
- **Direct Downloads**: Files save directly to your machine with a clean naming convention: `{original-name}-docmint.{ext}`.
- **Meaningful Feedback**: Smart error message system that provides actionable troubleshooting suggestions.
- **Mobile Responsive**: Fully optimized for desktops, tablets, and smartphones.
- **Generous Limits**: Up to **50 free conversions per day**.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS (Custom Design System), Lucide Icons.
- **Backend**: Firebase Cloud Functions (Node.js 18).
- **Database**: Cloud Firestore (Rate limits, Stats, Feedback).
- **Storage**: Firebase Cloud Storage (Secure temporary storage).
- **API**: iLovePDF REST API.

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
- Node.js 18+
- Firebase CLI (`npm install -g firebase-tools`)
- iLovePDF API keys (Public & Secret)

### 1. Installation
```bash
# Frontend
cd frontend && npm install

# Functions
cd ../functions && npm install
```

### 2. Run Locally
```bash
# Start frontend
cd frontend && npm run dev

# Start Firebase Emulators (optional)
firebase emulators:start
```
Open `http://localhost:5173` to view the app.

## 📑 Available Tools & Tasks

| Tool | ID | Description |
|------|----|-------------|
| **Office to PDF** | `office-to-pdf` | Convert Word, Excel, PPT to PDF |
| **PDF to JPG** | `pdf-to-jpg` | Extract pages as high-quality images |
| **PDF OCR** | `pdf-ocr` | Make scanned PDFs searchable |
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

## 🤝 Feedback & Support
Have a suggestion or found a bug? Use our **Contact Page** to send feedback directly to our team. Feedback is stored securely in Firestore and reviewed regularly.

---
**DocMint** - Simplified File Management.
*Live Link* - https://docmint.netlify.app/