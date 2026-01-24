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
    optionsComponent: 'LanguageSelector',
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

// Monochrome theme - single color for all tools
const DEFAULT_COLOR = {
  bg: 'bg-white dark:bg-black',
  text: 'text-black dark:text-white',
  border: 'border-gray-200 dark:border-neutral-border',
  gradient: 'from-black to-black',
};

// Color mapping for tool cards - returns same monochrome style for all
export const COLORS = new Proxy({}, {
  get: () => DEFAULT_COLOR
});

// Helper function to get tool color (always returns monochrome)
export const getToolColor = () => DEFAULT_COLOR;

// Get tool by ID
export function getToolById(toolId) {
  return CONVERSION_TOOLS.find(tool => tool.id === toolId);
}
