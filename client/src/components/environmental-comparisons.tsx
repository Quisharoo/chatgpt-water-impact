import { ShowerHead, Coffee, Car, Leaf, FileSpreadsheet, FileText, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WaterConsumptionData } from "@shared/schema";
import { downloadCSV, downloadFile } from "@/lib/download-utils";

interface EnvironmentalComparisonsProps {
  data: WaterConsumptionData;
}

export default function EnvironmentalComparisons({ data }: EnvironmentalComparisonsProps) {
  const comparisons = [
    {
      icon: ShowerHead,
      label: "Shower time",
      value: `${data.comparisons.showerMinutes.toFixed(1)} min`,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      iconColor: "text-blue-500"
    },
    {
      icon: Coffee,
      label: "Cups of coffee",
      value: data.comparisons.coffeeCups.toLocaleString(),
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      iconColor: "text-green-500"
    },
    {
      icon: Car,
      label: "Car wash cycles",
      value: data.comparisons.carWashes.toFixed(1),
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      iconColor: "text-purple-500"
    }
  ];

  const exportCSV = () => {
    const rows = [
      ['Date', 'Water Liters', 'Messages'],
      ...data.dailyConsumption.map(d => [d.date, d.waterLiters, d.messages])
    ];
    downloadCSV(rows, 'chatgpt-water-impact.csv');
  };

  const exportReport = () => {
    const reportContent = `
ChatGPT Water Impact Analysis Report

Summary:
- Total Water Consumed: ${data.totalWaterLiters.toFixed(1)} liters
- Total Messages: ${data.totalMessages.toLocaleString()}
- Days Active: ${data.daysActive}
- Equivalent Water Bottles: ${data.waterBottles}

Environmental Comparisons:
- Shower Time: ${data.comparisons.showerMinutes.toFixed(1)} minutes
- Cups of Coffee: ${data.comparisons.coffeeCups.toLocaleString()}
- Car Wash Cycles: ${data.comparisons.carWashes.toFixed(1)}

Daily Consumption:
${data.dailyConsumption.map(d => `${d.date}: ${d.waterLiters.toFixed(1)}L (${d.messages} messages)`).join('\n')}
    `.trim();

    downloadFile(reportContent, 'chatgpt-water-impact-report.txt');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Impact Comparisons */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">Environmental Comparisons</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {comparisons.map((comparison, index) => {
            const IconComponent = comparison.icon;
            return (
              <div key={index} className={`flex items-center justify-between p-4 ${comparison.bgColor} rounded-xl`}>
                <div className="flex items-center space-x-3">
                  <IconComponent className={`${comparison.iconColor} text-xl`} />
                  <span className="font-medium text-slate-900">{comparison.label}</span>
                </div>
                <span className={`text-xl font-bold ${comparison.textColor}`}>
                  {comparison.value}
                </span>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Educational Info & Export */}
      <div className="space-y-6">
        <Card className="gradient-blue-green border border-green-200">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Leaf className="text-white text-xl" />
              <h3 className="text-xl font-bold text-white">Why This Matters</h3>
            </div>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed opacity-90">
                AI models like ChatGPT require significant computational resources, which translates to energy consumption and water usage for cooling data centers.
              </p>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Key Facts:</h4>
                <ul className="space-y-1 text-sm opacity-90">
                  <li>• Each query uses ~0.5L of water on average</li>
                  <li>• Data centers need cooling systems</li>
                  <li>• Longer conversations = more processing</li>
                  <li>• Being mindful helps reduce impact</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Section */}
        <Card className="border border-slate-200">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Export Your Data</h3>
                <p className="text-slate-700">Download your water consumption analysis</p>
              </div>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={exportCSV}
                  className="flex items-center space-x-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export CSV</span>
                </Button>
                <Button 
                  onClick={exportReport}
                  className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600"
                >
                  <FileText className="w-4 h-4" />
                  <span>Export Report</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
