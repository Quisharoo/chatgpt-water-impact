import { Droplet, MessageCircle, Calendar, ShowerHead, Coffee, Car, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
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
      iconColor: "text-blue-500",
      info: "Based on 0.5 liters per query, accounting for data center cooling, power generation water usage, and infrastructure requirements."
    },
    {
      icon: MessageCircle,
      label: "Messages",
      value: data.totalMessages.toLocaleString(),
      badge: "COUNT",
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
      info: "Total number of user queries (not including ChatGPT responses) in your conversation history."
    },
    {
      icon: Calendar,
      label: "Days active",
      value: data.daysActive.toString(),
      badge: "PERIOD",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-500",
      info: "The number of unique days where you had conversations with ChatGPT."
    },
    {
      icon: ShowerHead,
      label: "Shower time equivalent",
      value: `${data.comparisons.showerMinutes.toFixed(1)} min`,
      badge: "EQUIVALENT",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500",
      info: "Based on a typical shower head flow rate of 13.5L per minute. This helps visualize water consumption in relatable terms."
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
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`${stat.iconColor} text-xl`} />
                  </div>
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                    {stat.badge}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-slate-100"
                          aria-label={`Information about ${stat.label}`}
                        >
                          <Info className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-slate-900">{stat.label}</h4>
                          <p className="text-sm text-slate-600">{stat.info}</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <p className="text-slate-700 text-sm">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Comparisons */}
      <Card className="border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 shadow-sm">
        <CardContent className="p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 md:gap-8">
            <span className="text-sm text-slate-600 font-semibold md:font-medium">Also equivalent to:</span>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {comparisons.map((comparison, index) => {
                const IconComponent = comparison.icon;
                return (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 md:bg-transparent md:px-0 md:py-0 shadow-sm md:shadow-none">
                    <div className={`w-10 h-10 md:w-auto md:h-auto flex items-center justify-center md:block`}>
                      <IconComponent className={`${comparison.iconColor} w-6 h-6 md:w-5 md:h-5`} />
                    </div>
                    <span className="text-slate-700 text-sm md:text-base">
                      <strong className="text-slate-900 text-lg md:text-base">{comparison.value}</strong> {comparison.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
