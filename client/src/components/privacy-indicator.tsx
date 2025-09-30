import { useState, useEffect } from "react";
import { CheckCircle, Shield, Laptop } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PrivacyIndicatorProps {
  isProcessing: boolean;
  processingComplete: boolean;
}

export default function PrivacyIndicator({ isProcessing, processingComplete }: PrivacyIndicatorProps) {
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    if (processingComplete) {
      setShowComplete(true);
      const timer = setTimeout(() => {
        setShowComplete(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [processingComplete]);

  if (!isProcessing && !showComplete) return null;

  return (
    <Alert className={`mt-4 ${showComplete ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
      {showComplete ? (
        <>
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-900 font-medium">
            ✓ Analysis complete. No data left your device.
          </AlertDescription>
        </>
      ) : (
        <>
          <Laptop className="h-4 w-4 text-blue-600 animate-pulse" />
          <AlertDescription className="text-blue-900 font-medium flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Processing locally in your browser... No data is transmitted.
          </AlertDescription>
        </>
      )}
    </Alert>
  );
}

