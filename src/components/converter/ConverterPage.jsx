import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

import FileUploader from './FileUploader';
import ProgressBar from './ProgressBar';
import DownloadSection from './DownloadSection';
import ErrorMessage from '../error/ErrorMessage';
import PageRangeSelector from './ConversionOptions/PageRangeSelector';
import QualitySelector from './ConversionOptions/QualitySelector';
import RotationSelector from './ConversionOptions/RotationSelector';
import WatermarkSettings from './ConversionOptions/WatermarkSettings';
import PasswordInput from './ConversionOptions/PasswordInput';

import { useFileUpload } from '../../hooks/useFileUpload';
import { useConversion } from '../../hooks/useConversion';
import { getToolById, COLORS, DAILY_CONVERSION_LIMIT } from '../../utils/constants';

const optionComponents = {
  PageRangeSelector,
  QualitySelector,
  RotationSelector,
  WatermarkSettings,
  PasswordInput,
};

export default function ConverterPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const tool = getToolById(toolId);

  const [stage, setStage] = useState('idle'); // idle, uploading, processing, complete, error
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [conversionOptions, setConversionOptions] = useState({});
  const [remainingConversions, setRemainingConversions] = useState(DAILY_CONVERSION_LIMIT);

  const { 
    uploadFile, 
    uploadMultipleFiles,
    uploadProgress, 
    isUploading, 
    error: uploadError,
    resetUpload 
  } = useFileUpload();

  const { 
    convertFile, 
    isConverting, 
    conversionProgress, 
    result, 
    error: conversionError,
    resetConversion 
  } = useConversion();

  // Check remaining conversions
  useEffect(() => {
    const checkRateLimit = () => {
      try {
        const rateLimitKey = 'conversionRateLimit';
        const data = JSON.parse(localStorage.getItem(rateLimitKey) || '{}');
        const today = new Date().toDateString();
        
        if (data.date === today) {
          setRemainingConversions(Math.max(0, DAILY_CONVERSION_LIMIT - (data.count || 0)));
        } else {
          setRemainingConversions(DAILY_CONVERSION_LIMIT);
        }
      } catch {
        setRemainingConversions(DAILY_CONVERSION_LIMIT);
      }
    };

    checkRateLimit();
  }, []);

  const incrementConversionCount = () => {
    try {
      const rateLimitKey = 'conversionRateLimit';
      const today = new Date().toDateString();
      const data = JSON.parse(localStorage.getItem(rateLimitKey) || '{}');
      
      if (data.date === today) {
        data.count = (data.count || 0) + 1;
      } else {
        data.date = today;
        data.count = 1;
      }
      
      localStorage.setItem(rateLimitKey, JSON.stringify(data));
      setRemainingConversions(Math.max(0, DAILY_CONVERSION_LIMIT - data.count));
    } catch (error) {
      console.error('Failed to update rate limit:', error);
    }
  };

  // Handle file selection
  const handleFilesSelected = useCallback((files) => {
    setSelectedFiles(files);
  }, []);

  // Handle conversion
  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select a file first');
      return;
    }

    if (remainingConversions <= 0) {
      toast.error('Daily limit reached. Try again tomorrow.');
      return;
    }

    try {
      // Stage 1: Uploading
      setStage('uploading');
      
      let uploadResult;
      if (tool.multipleFiles && selectedFiles.length > 1) {
        uploadResult = await uploadMultipleFiles(selectedFiles);
      } else {
        uploadResult = await uploadFile(selectedFiles[0]);
      }

      // Stage 2: Processing
      setStage('processing');

      const conversionResult = await convertFile({
        fileUrl: Array.isArray(uploadResult) 
          ? uploadResult.map(r => r.url) 
          : uploadResult.url,
        fileName: Array.isArray(uploadResult) 
          ? uploadResult.map(r => r.fileName) 
          : uploadResult.fileName,
        conversionType: tool.ilovepdfTask,
        options: conversionOptions,
      });

      // Stage 3: Complete
      setStage('complete');
      incrementConversionCount();
      toast.success('Conversion complete!');

    } catch (error) {
      setStage('error');
      toast.error(error.message || 'Conversion failed');
    }
  };

  // Reset and convert another
  const handleConvertAnother = () => {
    setStage('idle');
    setSelectedFiles([]);
    setConversionOptions({});
    resetUpload();
    resetConversion();
  };

  // Reset state when tool changes
  useEffect(() => {
    setStage('idle');
    setSelectedFiles([]);
    setConversionOptions({});
    resetUpload();
    resetConversion();
  }, [toolId, resetUpload, resetConversion]);

  // Handle retry
  const handleRetry = () => {
    handleConvertAnother();
  };

  // If tool not found
  if (!tool) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Tool Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          The conversion tool you're looking for doesn't exist.
        </p>
        <Link to="/#tools" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back to Tools
        </Link>
      </div>
    );
  }

  const IconComponent = Icons[tool.icon] || Icons.File;
  const colors = COLORS[tool.color] || COLORS.blue;
  const OptionsComponent = tool.optionsComponent 
    ? optionComponents[tool.optionsComponent] 
    : null;

  // Calculate overall progress
  const overallProgress = stage === 'uploading' 
    ? uploadProgress * 0.4 
    : stage === 'processing' 
      ? 40 + conversionProgress * 0.6 
      : stage === 'complete' 
        ? 100 
        : 0;

  return (
    <div key={toolId} className="max-w-3xl mx-auto px-4 py-8 animate-slide-up">
      {/* Back button */}
      <Link 
        to="/#tools"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tools
      </Link>

      {/* Tool header */}
      <div className="flex items-center gap-4 mb-8">
        <div className={`p-4 rounded-2xl ${colors.bg} ${colors.border} border`}>
          <IconComponent className={`w-8 h-8 ${colors.text}`} strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {tool.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {tool.description}
          </p>
        </div>
      </div>

      {/* Rate limit warning */}
      {remainingConversions <= 3 && remainingConversions > 0 && (
        <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            You have {remainingConversions} free conversion{remainingConversions > 1 ? 's' : ''} remaining today.
          </p>
        </div>
      )}

      {remainingConversions === 0 && (
        <div className="p-6 mb-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-center">
          <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-3" />
          <h3 className="font-semibold text-red-700 dark:text-red-300 mb-2">
            Daily Limit Reached
          </h3>
          <p className="text-sm text-red-600 dark:text-red-400">
            You've used all {DAILY_CONVERSION_LIMIT} free conversions for today. Try again tomorrow!
          </p>
        </div>
      )}

      {/* Main content */}
      {stage === 'idle' && remainingConversions > 0 && (
        <div className="space-y-6">
          {/* File uploader */}
          <div className="card p-6">
            <FileUploader
              tool={tool}
              onFilesSelected={handleFilesSelected}
              maxFiles={tool.multipleFiles ? 20 : 1}
            />
          </div>

          {/* Conversion options */}
          {OptionsComponent && selectedFiles.length > 0 && (
            <div className="card p-6">
              <OptionsComponent
                tool={tool}
                value={conversionOptions[tool.optionsComponent]}
                onChange={(value) => 
                  setConversionOptions(prev => ({
                    ...prev,
                    [tool.optionsComponent]: value
                  }))
                }
              />
            </div>
          )}

          {/* Convert button */}
          {selectedFiles.length > 0 && (
            <button
              onClick={handleConvert}
              className="w-full btn-primary text-lg py-4"
            >
              Convert {selectedFiles.length > 1 ? `${selectedFiles.length} Files` : 'File'}
            </button>
          )}
        </div>
      )}

      {/* Progress view */}
      {(stage === 'uploading' || stage === 'processing') && (
        <div className="card p-6 md:p-8">
          <ProgressBar
            stage={stage}
            progress={overallProgress}
          />
        </div>
      )}

      {/* Complete view */}
      {stage === 'complete' && result && (
        <DownloadSection
          downloadUrl={result.downloadUrl}
          fileName={result.fileName}
          fileSize={result.fileSize}
          expiresAt={result.expiresAt}
          onConvertAnother={handleConvertAnother}
        />
      )}

      {/* Error view */}
      {stage === 'error' && (
        <ErrorMessage
          title="Conversion Failed"
          message={uploadError || conversionError?.message || conversionError || 'An unexpected error occurred.'}
          suggestions={conversionError?.suggestions || []}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
