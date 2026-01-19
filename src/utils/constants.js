// Conversion tools configuration
export const CONVERSION_TOOLS = [
  {
    id: 'office-to-pdf',
    name: 'Office to PDF',
    description: 'Convert Word, Excel, PowerPoint to PDF',
    icon: 'FileText',
    acceptedTypes: ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'],
    mimeTypes: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
    ilovepdfTask: 'officepdf',
    color: 'blue',
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    description: 'Convert PDF pages to JPG images',
    icon: 'Image',
    acceptedTypes: ['.pdf'],
    mimeTypes: ['application/pdf'],
    ilovepdfTask: 'pdfjpg',
    color: 'green',
    hasOptions: true,
    optionsComponent: 'PageRangeSelector',
  },
  {
    id: 'pdf-ocr',
    name: 'PDF OCR',
    description: 'Make scanned PDFs searchable',
    icon: 'ScanText',
    acceptedTypes: ['.pdf'],
    mimeTypes: ['application/pdf'],
    ilovepdfTask: 'pdfocr',
    color: 'purple',
  },
  {
    id: 'add-page-numbers',
    name: 'Add Page Numbers',
    description: 'Add page numbers to PDF',
    icon: 'Hash',
    acceptedTypes: ['.pdf'],
    mimeTypes: ['application/pdf'],
    ilovepdfTask: 'pagenumber',
    color: 'indigo',
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert JPG, PNG, TIFF to PDF',
    icon: 'ImagePlus',
    acceptedTypes: ['.jpg', '.jpeg', '.png', '.tiff', '.tif'],
    mimeTypes: ['image/jpeg', 'image/png', 'image/tiff'],
    ilovepdfTask: 'imagepdf',
    color: 'orange',
    multipleFiles: true,
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Reduce PDF file size',
    icon: 'Minimize2',
    acceptedTypes: ['.pdf'],
    mimeTypes: ['application/pdf'],
    ilovepdfTask: 'compress',
    color: 'red',
    hasOptions: true,
    optionsComponent: 'QualitySelector',
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDFs into one',
    icon: 'Layers',
    acceptedTypes: ['.pdf'],
    mimeTypes: ['application/pdf'],
    ilovepdfTask: 'merge',
    color: 'indigo',
    multipleFiles: true,
    minFiles: 2,
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    description: 'Extract pages from PDF',
    icon: 'Scissors',
    acceptedTypes: ['.pdf'],
    mimeTypes: ['application/pdf'],
    ilovepdfTask: 'split',
    color: 'pink',
    hasOptions: true,
    optionsComponent: 'PageRangeSelector',
  },
  {
    id: 'rotate-pdf',
    name: 'Rotate PDF',
    description: 'Rotate PDF pages',
    icon: 'RotateCw',
    acceptedTypes: ['.pdf'],
    mimeTypes: ['application/pdf'],
    ilovepdfTask: 'rotate',
    color: 'cyan',
    hasOptions: true,
    optionsComponent: 'RotationSelector',
  },
  {
    id: 'protect-pdf',
    name: 'Protect PDF',
    description: 'Add password to PDF',
    icon: 'Lock',
    acceptedTypes: ['.pdf'],
    mimeTypes: ['application/pdf'],
    ilovepdfTask: 'protect',
    color: 'emerald',
    hasOptions: true,
    optionsComponent: 'PasswordInput',
  },
  {
    id: 'unlock-pdf',
    name: 'Unlock PDF',
    description: 'Remove PDF password protection',
    icon: 'Unlock',
    acceptedTypes: ['.pdf'],
    mimeTypes: ['application/pdf'],
    ilovepdfTask: 'unlock',
    color: 'yellow',
    hasOptions: true,
    optionsComponent: 'PasswordInput',
  },
  {
    id: 'watermark-pdf',
    name: 'Watermark PDF',
    description: 'Add text or image watermark',
    icon: 'Stamp',
    acceptedTypes: ['.pdf'],
    mimeTypes: ['application/pdf'],
    ilovepdfTask: 'watermark',
    color: 'teal',
    hasOptions: true,
    optionsComponent: 'WatermarkSettings',
  },
];

// Maximum file size (100MB)
export const MAX_FILE_SIZE = 100 * 1024 * 1024;

// File expiration time (1 hour)
export const FILE_EXPIRATION_MS = 60 * 60 * 1000;

// Rate limit
export const DAILY_CONVERSION_LIMIT = 50;

// Supported file extensions
export const SUPPORTED_EXTENSIONS = [
  'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
  'jpg', 'jpeg', 'png', 'tiff', 'tif'
];

// Color mapping for tool cards
export const COLORS = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    gradient: 'from-blue-500 to-blue-600',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    gradient: 'from-green-500 to-green-600',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
    gradient: 'from-purple-500 to-purple-600',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
    gradient: 'from-orange-500 to-orange-600',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    gradient: 'from-red-500 to-red-600',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200 dark:border-indigo-800',
    gradient: 'from-indigo-500 to-indigo-600',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    text: 'text-pink-600 dark:text-pink-400',
    border: 'border-pink-200 dark:border-pink-800',
    gradient: 'from-pink-500 to-pink-600',
  },
  cyan: {
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-200 dark:border-cyan-800',
    gradient: 'from-cyan-500 to-cyan-600',
  },
  yellow: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    text: 'text-yellow-600 dark:text-yellow-400',
    border: 'border-yellow-200 dark:border-yellow-800',
    gradient: 'from-yellow-500 to-yellow-600',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    text: 'text-teal-600 dark:text-teal-400',
    border: 'border-teal-200 dark:border-teal-800',
    gradient: 'from-teal-500 to-teal-600',
  },
};

// Get tool by ID
export function getToolById(toolId) {
  return CONVERSION_TOOLS.find(tool => tool.id === toolId);
}
