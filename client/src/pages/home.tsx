import { useState } from "react";
import { Droplet } from "lucide-react";
import FileUpload from "@/components/file-upload";
import SummaryStats from "@/components/summary-stats";
import WaterChart from "@/components/water-chart";
import Methodology from "@/components/methodology";
import ImpactFooter from "@/components/impact-footer";
import EducationalFooter from "@/components/educational-footer";
import PrivacyBanner from "@/components/privacy-banner";
import PrivacyFAQ from "@/components/privacy-faq";
import { WaterConsumptionData } from "@shared/schema";

export default function Home() {
  const [analysisData, setAnalysisData] = useState<WaterConsumptionData | null>(null);

  const handleAnalysisComplete = (data: WaterConsumptionData) => {
    setAnalysisData(data);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-blue-green rounded-xl flex items-center justify-center">
              <Droplet className="text-white text-lg water-droplet-animation" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">ChatGPT Water Impact Analyzer</h1>
              <p className="text-slate-700 text-sm">Analyze the water consumption of your ChatGPT conversations</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Privacy Banner */}
        <PrivacyBanner />

        {/* File Upload Section */}
        <FileUpload onAnalysisComplete={handleAnalysisComplete} />

        {/* Results Section */}
        {analysisData && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <SummaryStats data={analysisData} />
            <WaterChart data={analysisData} />
            <Methodology />
            <ImpactFooter data={analysisData} />
          </div>
        )}

        {/* Methodology Section - shown even without data */}
        {!analysisData && <Methodology />}

        {/* Privacy FAQ */}
        <PrivacyFAQ />

        {/* Educational Footer */}
        <EducationalFooter />
      </main>
    </div>
  );
}
