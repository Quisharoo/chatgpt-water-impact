import { Droplet, MessageCircle, Calendar, ShowerHead, Coffee, Car } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { WaterConsumptionData } from "@shared/schema";

interface SummaryStatsProps {
  data: WaterConsumptionData;
}

export default function SummaryStats({ data }: SummaryStatsProps) {
  const stats = [
    {
      icon: Droplet,
      label: "Water consumed",
      value: `${data.totalWaterLiters.toFixed(1)}L`,
      badge: "TOTAL",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500"
    },
    {
      icon: MessageCircle,
      label: "Messages",
      value: data.totalMessages.toLocaleString(),
      badge: "COUNT",
      bgColor: "bg-green-100",
      iconColor: "text-green-500"
    },
    {
      icon: Calendar,
      label: "Days active",
      value: data.daysActive.toString(),
      badge: "PERIOD",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-500"
    },
    {
      icon: ShowerHead,
      label: "Shower time equivalent",
      value: `${data.comparisons.showerMinutes.toFixed(1)} min`,
      badge: "EQUIVALENT",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500"
    }
  ];

  const comparisons = [
    {
      icon: Coffee,
      label: "Cups of coffee",
      value: data.comparisons.coffeeCups.toLocaleString(),
      iconColor: "text-amber-600"
    },
    {
      icon: Car,
      label: "Car washes",
      value: data.comparisons.carWashes.toFixed(1),
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-4">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`${stat.iconColor} text-xl`} />
                  </div>
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                    {stat.badge}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-slate-700 text-sm">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Comparisons */}
      <Card className="border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-8">
            <span className="text-sm text-slate-600 font-medium">Also equivalent to:</span>
            {comparisons.map((comparison, index) => {
              const IconComponent = comparison.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <IconComponent className={`${comparison.iconColor} w-5 h-5`} />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{comparison.value}</strong> {comparison.label}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
