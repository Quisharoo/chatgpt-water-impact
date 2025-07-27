import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WaterConsumptionData } from "@shared/schema";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface WaterChartProps {
  data: WaterConsumptionData;
}

type ViewMode = 'daily' | 'weekly' | 'monthly';

export default function WaterChart({ data }: WaterChartProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('daily');

  const processDataForView = (mode: ViewMode) => {
    const dailyData = data.dailyConsumption;
    
    if (mode === 'daily') {
      return {
        labels: dailyData.map(d => new Date(d.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })),
        datasets: [{
          label: 'Water Consumption (L)',
          data: dailyData.map(d => d.waterLiters),
          borderColor: 'hsl(221, 83%, 53%)',
          backgroundColor: 'hsla(221, 83%, 53%, 0.1)',
          tension: 0.4,
          fill: true,
        }]
      };
    }
    
    // For weekly/monthly, we'd need to aggregate the data
    // For now, return daily data as placeholder
    return {
      labels: dailyData.slice(0, 7).map(d => new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })),
      datasets: [{
        label: 'Water Consumption (L)',
        data: dailyData.slice(0, 7).map(d => d.waterLiters),
        borderColor: 'hsl(221, 83%, 53%)',
        backgroundColor: 'hsla(221, 83%, 53%, 0.1)',
        tension: 0.4,
        fill: true,
      }]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#1e293b',
        bodyColor: '#475569',
        borderColor: '#e2e8f0',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9'
        },
        ticks: {
          color: '#64748b'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#64748b'
        }
      }
    }
  };

  return (
    <Card className="border border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">Daily Water Consumption</CardTitle>
            <p className="text-slate-600">Water usage from your ChatGPT conversations over time</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'daily' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('daily')}
            >
              Daily
            </Button>
            <Button
              variant={viewMode === 'weekly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('weekly')}
            >
              Weekly
            </Button>
            <Button
              variant={viewMode === 'monthly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('monthly')}
            >
              Monthly
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Line data={processDataForView(viewMode)} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
}
