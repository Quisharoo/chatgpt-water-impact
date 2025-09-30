import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, FileText, AlertCircle, Sparkles, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { parseConversationFile } from "@/lib/conversation-parser";
import { calculateWaterConsumption } from "@/lib/water-calculator";
import { WaterConsumptionData } from "@shared/schema";
import PrivacyIndicator from "@/components/privacy-indicator";
import JSZip from "jszip";
import sampleData from "@/assets/sample-conversation.json";

interface FileUploadProps {
  onAnalysisComplete: (data: WaterConsumptionData) => void;
}

export default function FileUpload({ onAnalysisComplete }: FileUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [processingComplete, setProcessingComplete] = useState(false);

  const processFile = useCallback(async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const isJson = file.name.toLowerCase().endsWith('.json');
      const isZip = file.name.toLowerCase().endsWith('.zip');

      if (!isJson && !isZip) {
        throw new Error('Please upload a ChatGPT export .zip or a conversations.json file');
      }

      setProgress(15);

      let jsonText: string;

      if (isZip) {
        const zip = await JSZip.loadAsync(file);
        setProgress(35);
        const exact = zip.file(/(^|\/)conversations\.json$/i);
        let entry = exact[0];
        if (!entry) {
          const anyJson = zip.file(/\.json$/i);
          entry = anyJson[0];
        }
        if (!entry) {
          throw new Error('Could not find conversations.json inside the ZIP export');
        }
        jsonText = await entry.async('string');
        setProgress(55);
      } else {
        jsonText = await file.text();
        setProgress(45);
      }

      const conversationData = parseConversationFile(jsonText);
      setProgress(75);

      // Calculate water consumption
      const waterData = calculateWaterConsumption(conversationData);
      setProgress(100);

      // Complete analysis
      setTimeout(() => {
        setIsProcessing(false);
        setProcessingComplete(true);
        onAnalysisComplete(waterData);
        // Reset the complete indicator after a delay
        setTimeout(() => setProcessingComplete(false), 100);
      }, 300);

    } catch (err) {
      console.error('File processing error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Local processing failed';
      setError(`${errorMessage}. Please ensure you're uploading a ChatGPT export ZIP or conversations.json.`);
      setIsProcessing(false);
      setProgress(0);
      setProcessingComplete(false);
    }
  }, [onAnalysisComplete]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      processFile(acceptedFiles[0]);
    }
  }, [processFile]);

  const loadSampleData = useCallback(() => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      setProgress(25);
      const jsonText = JSON.stringify(sampleData);
      setProgress(50);
      
      const conversationData = parseConversationFile(jsonText);
      setProgress(75);

      const waterData = calculateWaterConsumption(conversationData);
      setProgress(100);

      setTimeout(() => {
        setIsProcessing(false);
        setProcessingComplete(true);
        onAnalysisComplete(waterData);
        setTimeout(() => setProcessingComplete(false), 100);
      }, 300);
    } catch (err) {
      console.error('Sample data processing error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load sample data';
      setError(errorMessage);
      setIsProcessing(false);
      setProgress(0);
      setProcessingComplete(false);
    }
  }, [onAnalysisComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'application/zip': ['.zip'],
      'application/x-zip-compressed': ['.zip']
    },
    maxFiles: 1,
    disabled: isProcessing
  });

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-8">
      <div className="text-center mb-6 md:mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">Upload Your ChatGPT Export</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 md:h-8 md:w-8 p-0 hover:bg-slate-100 flex-shrink-0 cursor-pointer"
                aria-label="How to get your ChatGPT export"
                type="button"
              >
                <HelpCircle className="h-5 w-5 text-slate-400 hover:text-slate-600" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="center">
              <div className="space-y-2">
                <p className="font-semibold text-sm">How to get your ChatGPT data:</p>
                <ol className="text-sm space-y-1 list-decimal list-inside text-slate-600">
                  <li>Open ChatGPT → Settings</li>
                  <li>Go to Data Controls → Export data</li>
                  <li>Check your email for the download link</li>
                  <li>Upload the .zip file here</li>
                </ol>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-sm md:text-base text-slate-700 px-4 md:px-0">Upload your ChatGPT export .zip (preferred) or a conversations.json file</p>
      </div>

      {/* File Upload Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-colors cursor-pointer min-h-[200px] flex items-center justify-center ${
          isDragActive 
            ? 'border-blue-400 bg-blue-50' 
            : isProcessing 
            ? 'border-slate-300 bg-slate-50 cursor-not-allowed'
            : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50 active:bg-blue-100'
        }`}
      >
        <input {...getInputProps()} aria-label="Upload ChatGPT export ZIP or JSON file" />
        <div className="space-y-4 w-full">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            {isProcessing ? (
              <FileText className="text-blue-500 text-2xl md:text-3xl animate-pulse" />
            ) : (
              <CloudUpload className="text-blue-500 text-2xl md:text-3xl" />
            )}
          </div>
          <div>
            {isProcessing ? (
              <p className="text-base md:text-lg font-medium text-slate-700">Processing locally in your browser...</p>
            ) : (
              <>
                <p className="text-base md:text-lg font-medium text-slate-700 px-4">Drop your ChatGPT export .zip or conversations.json here</p>
                <p className="text-sm md:text-base text-slate-600 mt-2">or click to browse</p>
              </>
            )}
          </div>
          {!isProcessing && (
            <Button className="bg-blue-500 hover:bg-blue-600 text-white min-h-[44px] px-6 text-base font-semibold">
              Choose File
            </Button>
          )}
        </div>
      </div>

      {/* Upload Progress */}
      {isProcessing && (
        <div className="mt-6">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-slate-700 mt-2">Processing locally... No data is being uploaded.</p>
        </div>
      )}

      {/* Privacy Indicator */}
      <PrivacyIndicator isProcessing={isProcessing} processingComplete={processingComplete} />

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Sample Data Option */}
      {!isProcessing && (
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="text-center">
            <p className="text-slate-600 mb-3 text-sm">Don't have your ChatGPT data handy?</p>
            <Button
              variant="outline"
              onClick={loadSampleData}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Try Sample Data
            </Button>
            <p className="text-slate-500 text-xs mt-2">View a demo with 50 sample conversations</p>
          </div>
        </div>
      )}
    </section>
  );
}
