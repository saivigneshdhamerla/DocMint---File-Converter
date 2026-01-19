import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { validateFile, formatFileSize } from '../../utils/fileValidation';

export default function FileUploader({ 
  tool, 
  onFilesSelected, 
  maxFiles = 1,
  disabled = false 
}) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError(null);

    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError('File size exceeds 100MB limit');
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError(`Invalid file type. Accepted: ${tool.acceptedTypes.join(', ')}`);
      } else {
        setError(rejection.errors[0]?.message || 'File rejected');
      }
      return;
    }

    // Validate accepted files
    for (const file of acceptedFiles) {
      const validation = validateFile(file, tool);
      if (!validation.valid) {
        setError(validation.error);
        return;
      }
    }

    // Limit number of files
    const newFiles = acceptedFiles.slice(0, maxFiles);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  }, [tool, maxFiles, onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: tool.mimeTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: 100 * 1024 * 1024, // 100MB
    maxFiles: maxFiles,
    disabled: disabled,
    multiple: maxFiles > 1,
  });

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 md:p-12
          transition-all duration-300 cursor-pointer
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${isDragActive 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
          }
          ${error 
            ? 'border-red-400 bg-red-50 dark:bg-red-900/20' 
            : ''
          }
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center text-center">
          {/* Upload icon */}
          <div className={`
            p-4 rounded-full mb-4
            ${isDragActive 
              ? 'bg-primary-100 dark:bg-primary-800/30' 
              : 'bg-gray-100 dark:bg-dark-tertiary'
            }
          `}>
            <Upload className={`
              w-8 h-8
              ${isDragActive 
                ? 'text-primary-500' 
                : 'text-gray-400 dark:text-gray-500'
              }
            `} />
          </div>

          {/* Text */}
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
            {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            or click to browse
          </p>

          {/* Accepted formats */}
          <div className="flex flex-wrap justify-center gap-2">
            {tool.acceptedTypes.map((type) => (
              <span 
                key={type}
                className="px-2 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-dark-tertiary text-gray-600 dark:text-gray-300"
              >
                {type}
              </span>
            ))}
          </div>

          {/* Max size info */}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            Maximum file size: 100MB
            {maxFiles > 1 && ` • Up to ${maxFiles} files`}
          </p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Selected files */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div 
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-dark-tertiary border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <File className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-800 dark:text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-secondary transition-colors"
                aria-label="Remove file"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
