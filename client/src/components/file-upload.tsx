import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { parseConversationFile } from "@/lib/conversation-parser";
import { calculateWaterConsumption } from "@/lib/water-calculator";
import { WaterConsumptionData } from "@shared/schema";

interface FileUploadProps {
  onAnalysisComplete: (data: WaterConsumptionData) => void;
}

export default function FileUpload({ onAnalysisComplete }: FileUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      // Validate file type
      if (!file.name.endsWith('.json')) {
        throw new Error('Please upload a JSON file');
      }

      setProgress(20);

      // Read file content
      const text = await file.text();
      setProgress(40);

      // Parse conversation data
      const conversationData = parseConversationFile(text);
      setProgress(70);

      // Calculate water consumption
      const waterData = calculateWaterConsumption(conversationData);
      setProgress(100);

      // Complete analysis
      setTimeout(() => {
        setIsProcessing(false);
        onAnalysisComplete(waterData);
      }, 500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
      setIsProcessing(false);
      setProgress(0);
    }
  }, [onAnalysisComplete]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      processFile(acceptedFiles[0]);
    }
  }, [processFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json']
    },
    maxFiles: 1,
    disabled: isProcessing
  });

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Your ChatGPT Conversation</h2>
        <p className="text-slate-600">Upload your conversation.json file to analyze water consumption</p>
      </div>

      {/* File Upload Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
          isDragActive 
            ? 'border-blue-400 bg-blue-50' 
            : isProcessing 
            ? 'border-slate-300 bg-slate-50 cursor-not-allowed'
            : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            {isProcessing ? (
              <FileText className="text-blue-500 text-2xl animate-pulse" />
            ) : (
              <CloudUpload className="text-blue-500 text-2xl" />
            )}
          </div>
          <div>
            {isProcessing ? (
              <p className="text-lg font-medium text-slate-700">Processing your file...</p>
            ) : (
              <>
                <p className="text-lg font-medium text-slate-700">Drop your conversation.json file here</p>
                <p className="text-slate-500 mt-1">or click to browse</p>
              </>
            )}
          </div>
          {!isProcessing && (
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Choose File
            </Button>
          )}
        </div>
      </div>

      {/* Upload Progress */}
      {isProcessing && (
        <div className="mt-6">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-slate-600 mt-2">Processing your conversation data...</p>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </section>
  );
}
