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
        datasets: [
          {
            label: 'Water Consumption (L)',
            data: dailyData.map(d => d.waterLiters),
            borderColor: 'hsl(221, 83%, 53%)',
            backgroundColor: 'hsla(221, 83%, 53%, 0.1)',
            tension: 0.4,
            fill: true,
            yAxisID: 'y',
          },
          {
            label: 'Number of Queries',
            data: dailyData.map(d => d.messages),
            borderColor: 'hsl(142, 71%, 45%)',
            backgroundColor: 'hsla(142, 71%, 45%, 0.1)',
            tension: 0.4,
            fill: false,
            yAxisID: 'y1',
          }
        ]
      };
    }
    
    // Aggregate data for weekly view
    if (mode === 'weekly') {
      const weeklyData = new Map<string, { waterLiters: number; messages: number; dates: string[] }>();
      
      dailyData.forEach(d => {
        const date = new Date(d.date);
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        const weekKey = startOfWeek.toISOString().split('T')[0];
        
        if (!weeklyData.has(weekKey)) {
          weeklyData.set(weekKey, { waterLiters: 0, messages: 0, dates: [] });
        }
        
        const week = weeklyData.get(weekKey)!;
        week.waterLiters += d.waterLiters;
        week.messages += d.messages;
        week.dates.push(d.date);
      });
      
      const sortedWeeks = Array.from(weeklyData.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([weekStart, data]) => ({
          label: `Week of ${new Date(weekStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
          waterLiters: data.waterLiters,
          messages: data.messages
        }));
      
      return {
        labels: sortedWeeks.map(w => w.label),
        datasets: [
          {
            label: 'Water Consumption (L)',
            data: sortedWeeks.map(w => w.waterLiters),
            borderColor: 'hsl(221, 83%, 53%)',
            backgroundColor: 'hsla(221, 83%, 53%, 0.1)',
            tension: 0.4,
            fill: true,
            yAxisID: 'y',
          },
          {
            label: 'Number of Queries',
            data: sortedWeeks.map(w => w.messages),
            borderColor: 'hsl(142, 71%, 45%)',
            backgroundColor: 'hsla(142, 71%, 45%, 0.1)',
            tension: 0.4,
            fill: false,
            yAxisID: 'y1',
          }
        ]
      };
    }
    
    // Aggregate data for monthly view
    if (mode === 'monthly') {
      const monthlyData = new Map<string, { waterLiters: number; messages: number }>();
      
      dailyData.forEach(d => {
        const date = new Date(d.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthlyData.has(monthKey)) {
          monthlyData.set(monthKey, { waterLiters: 0, messages: 0 });
        }
        
        const month = monthlyData.get(monthKey)!;
        month.waterLiters += d.waterLiters;
        month.messages += d.messages;
      });
      
      const sortedMonths = Array.from(monthlyData.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([monthKey, data]) => ({
          label: new Date(monthKey + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
          waterLiters: data.waterLiters,
          messages: data.messages
        }));
      
      return {
        labels: sortedMonths.map(m => m.label),
        datasets: [
          {
            label: 'Water Consumption (L)',
            data: sortedMonths.map(m => m.waterLiters),
            borderColor: 'hsl(221, 83%, 53%)',
            backgroundColor: 'hsla(221, 83%, 53%, 0.1)',
            tension: 0.4,
            fill: true,
            yAxisID: 'y',
          },
          {
            label: 'Number of Queries',
            data: sortedMonths.map(m => m.messages),
            borderColor: 'hsl(142, 71%, 45%)',
            backgroundColor: 'hsla(142, 71%, 45%, 0.1)',
            tension: 0.4,
            fill: false,
            yAxisID: 'y1',
          }
        ]
      };
    }

    return { labels: [], datasets: [] };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#64748b',
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#1e293b',
        bodyColor: '#475569',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            if (label.includes('Water')) {
              return `${label}: ${value.toFixed(2)}L`;
            } else {
              return `${label}: ${value} queries`;
            }
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#64748b'
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        grid: {
          color: '#f1f5f9'
        },
        ticks: {
          color: '#64748b',
          callback: function(value: any) {
            return value.toFixed(1) + 'L';
          }
        },
        title: {
          display: true,
          text: 'Water Consumption (L)',
          color: '#64748b'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#64748b',
          callback: function(value: any) {
            return Math.round(value) + ' queries';
          }
        },
        title: {
          display: true,
          text: 'Number of Queries',
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
            <CardTitle className="text-xl font-bold text-slate-900">Water Consumption & Query Analytics</CardTitle>
            <p className="text-slate-700">Track both water usage and conversation volume from your ChatGPT interactions</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600">Time Period:</span>
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
