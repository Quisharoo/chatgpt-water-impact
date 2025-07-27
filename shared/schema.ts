import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const conversations = pgTable("conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  filename: text("filename").notNull(),
  totalMessages: integer("total_messages").notNull(),
  totalWaterLiters: real("total_water_liters").notNull(),
  daysActive: integer("days_active").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  data: jsonb("data").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Conversation = typeof conversations.$inferSelect;

// Types for conversation analysis
export interface ConversationMessage {
  id: string;
  author: {
    role: string;
  };
  content: {
    content_type: string;
    parts: string[];
  };
  create_time: number;
}

export interface WaterConsumptionData {
  totalWaterLiters: number;
  totalMessages: number;
  daysActive: number;
  waterBottles: number;
  dailyConsumption: Array<{
    date: string;
    waterLiters: number;
    messages: number;
  }>;
  comparisons: {
    showerMinutes: number;
    coffeeCups: number;
    carWashes: number;
  };
}
