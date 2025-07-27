import { WaterConsumptionData } from "@shared/schema";
import { ParsedConversation } from "./conversation-parser";

// Water consumption estimates
const WATER_PER_QUERY_LITERS = 0.5; // Approximate water usage per AI query
const WATER_BOTTLE_ML = 500;
const SHOWER_LITERS_PER_MINUTE = 13.5;
const COFFEE_ML_PER_CUP = 150;
const CAR_WASH_LITERS = 40;

export function calculateWaterConsumption(conversation: ParsedConversation): WaterConsumptionData {
  const { messages, totalMessages, dateRange } = conversation;

  // Calculate total water consumption
  const totalWaterLiters = totalMessages * WATER_PER_QUERY_LITERS;
  
  // Calculate days active
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysActive = Math.max(1, Math.ceil((dateRange.end.getTime() - dateRange.start.getTime()) / millisecondsPerDay));
  
  // Calculate water bottles equivalent
  const waterBottles = Math.ceil((totalWaterLiters * 1000) / WATER_BOTTLE_ML);

  // Group messages by day for daily consumption
  const dailyGroups = new Map<string, { messages: number; waterLiters: number }>();
  
  messages.forEach(message => {
    const date = new Date(message.create_time * 1000);
    const dayKey = date.toISOString().split('T')[0];
    
    if (!dailyGroups.has(dayKey)) {
      dailyGroups.set(dayKey, { messages: 0, waterLiters: 0 });
    }
    
    const day = dailyGroups.get(dayKey)!;
    day.messages += 1;
    day.waterLiters += WATER_PER_QUERY_LITERS;
  });

  // Convert to sorted array
  const dailyConsumption = Array.from(dailyGroups.entries())
    .map(([date, data]) => ({
      date,
      waterLiters: data.waterLiters,
      messages: data.messages
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Calculate environmental comparisons
  const comparisons = {
    showerMinutes: totalWaterLiters / SHOWER_LITERS_PER_MINUTE,
    coffeeCups: Math.ceil((totalWaterLiters * 1000) / COFFEE_ML_PER_CUP),
    carWashes: totalWaterLiters / CAR_WASH_LITERS
  };

  return {
    totalWaterLiters,
    totalMessages,
    daysActive,
    waterBottles,
    dailyConsumption,
    comparisons
  };
}
