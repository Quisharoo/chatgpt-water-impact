import { useState } from "react";
import { Droplet } from "lucide-react";
import FileUpload from "@/components/file-upload";
import SummaryStats from "@/components/summary-stats";
import WaterChart from "@/components/water-chart";
import EnvironmentalComparisons from "@/components/environmental-comparisons";
import EducationalFooter from "@/components/educational-footer";
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
              <h1 className="text-2xl font-bold text-slate-900">ChatGPT Water Footprint</h1>
              <p className="text-slate-700 text-sm">Analyze the environmental impact of your AI conversations</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* File Upload Section */}
        <FileUpload onAnalysisComplete={handleAnalysisComplete} />

        {/* Results Section */}
        {analysisData && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <SummaryStats data={analysisData} />
            <WaterChart data={analysisData} />
            <EnvironmentalComparisons data={analysisData} />
          </div>
        )}

        {/* Educational Footer */}
        <EducationalFooter />
      </main>
    </div>
  );
}
