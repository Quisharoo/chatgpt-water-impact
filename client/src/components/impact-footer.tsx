import { Leaf, FileSpreadsheet, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WaterConsumptionData } from "@shared/schema";
import { downloadCSV, downloadFile } from "@/lib/download-utils";
import { useToast } from "@/hooks/use-toast";

interface ImpactFooterProps {
  data: WaterConsumptionData;
}

export default function ImpactFooter({ data }: ImpactFooterProps) {
  const { toast } = useToast();

  const exportCSV = () => {
    try {
      const rows = [
        ['Date', 'Water Liters', 'Messages'],
        ...data.dailyConsumption.map(d => [d.date, d.waterLiters, d.messages])
      ];
      downloadCSV(rows, 'chatgpt-water-impact.csv');
      toast({
        title: "CSV Exported",
        description: "Your water consumption data has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to export CSV. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportReport = () => {
    try {
      const reportContent = `
ChatGPT Water Impact Analysis Report

Summary:
- Total Water Consumed: ${data.totalWaterLiters.toFixed(1)} liters
- Total Messages: ${data.totalMessages.toLocaleString()}
- Days Active: ${data.daysActive}

Environmental Comparisons:
- Shower Time: ${data.comparisons.showerMinutes.toFixed(1)} minutes
- Cups of Coffee: ${data.comparisons.coffeeCups.toLocaleString()}
- Car Wash Cycles: ${data.comparisons.carWashes.toFixed(1)}

Daily Consumption:
${data.dailyConsumption.map(d => `${d.date}: ${d.waterLiters.toFixed(1)}L (${d.messages} messages)`).join('\n')}
    `.trim();

      downloadFile(reportContent, 'chatgpt-water-impact-report.txt');
      toast({
        title: "Report Downloaded",
        description: "Your water impact report has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to export report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="gradient-blue-green border border-green-200">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Why This Matters */}
          <div className="lg:col-span-2 space-y-4 text-white">
            <div className="flex items-center space-x-3">
              <Leaf className="text-white text-xl flex-shrink-0" />
              <h3 className="text-xl font-bold text-white">Why This Matters</h3>
            </div>
            <p className="leading-relaxed opacity-90">
              AI models like ChatGPT require significant computational resources, which translates to energy consumption and water usage for cooling data centers.
            </p>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Key Facts:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm opacity-90">
                <li>• Each query uses ~0.5L of water</li>
                <li>• Data centers need cooling systems</li>
                <li>• Longer conversations = more processing</li>
                <li>• Being mindful helps reduce impact</li>
              </ul>
            </div>
          </div>

          {/* Export Actions */}
          <div className="bg-white bg-opacity-20 rounded-lg p-6 space-y-4">
            <div>
              <h4 className="font-bold text-white mb-1">Export Your Data</h4>
              <p className="text-white text-sm opacity-90">Download your water consumption analysis</p>
            </div>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                onClick={exportCSV}
                className="w-full bg-white text-slate-900 hover:bg-slate-100 border-0 min-h-[44px] active:scale-[0.98] transition-transform touch-manipulation"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button 
                onClick={exportReport}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white min-h-[44px] active:scale-[0.98] transition-transform touch-manipulation"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
