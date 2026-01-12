import { pgTable, text, integer, real, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Types
export type Season = "winter" | "spring" | "summer" | "fall";
export type Team = "cafe" | "kitchen";
export type MainCategory = "food" | "non-food";
export type StorageType = "refrigerated" | "frozen" | "room-temp";
export type OrderStatus = "normal" | "need-order" | "ordered";

// Labels and constants
export const seasonLabels: Record<Season, string> = {
  winter: "겨울 시즌",
  spring: "봄 시즌",
  summer: "여름 시즌",
  fall: "가을 시즌",
};

export const seasonEmojis: Record<Season, string> = {
  winter: "W",
  spring: "Sp",
  summer: "Su",
  fall: "F",
};

export const seasonMonths: Record<Season, string> = {
  winter: "12월~2월",
  spring: "3월~5월",
  summer: "6월~8월",
  fall: "9월~11월",
};

export const teamLabels: Record<Team, string> = {
  cafe: "카페팀",
  kitchen: "주방팀",
};

export const mainCategoryLabels: Record<MainCategory, string> = {
  food: "식자재",
  "non-food": "비식품",
};

export const storageTypeLabels: Record<StorageType, string> = {
  refrigerated: "냉장",
  frozen: "냉동",
  "room-temp": "상온",
};

// Drizzle Tables
export const suppliers = pgTable("suppliers", {
  id: varchar("id", { length: 36 }).primaryKey(),
  team: varchar("team", { length: 20 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  url: text("url"),
});

export const menuTags = pgTable("menu_tags", {
  id: varchar("id", { length: 36 }).primaryKey(),
  team: varchar("team", { length: 20 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  color: varchar("color", { length: 200 }).notNull(),
});

export const subCategories = pgTable("sub_categories", {
  id: varchar("id", { length: 36 }).primaryKey(),
  team: varchar("team", { length: 20 }).notNull(),
  mainCategory: varchar("main_category", { length: 20 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
});

export interface SeasonalRequirement {
  season: Season;
  dailyUsage: number;
  leadTime: number;
  safetyStock: number;
  requiredStock: number;
}

export const inventoryItems = pgTable("inventory_items", {
  id: varchar("id", { length: 36 }).primaryKey(),
  team: varchar("team", { length: 20 }).notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  mainCategory: varchar("main_category", { length: 20 }).notNull(),
  storageType: varchar("storage_type", { length: 20 }),
  subCategory: varchar("sub_category", { length: 100 }).notNull(),
  unit: varchar("unit", { length: 50 }).notNull(),
  currentStock: real("current_stock").notNull().default(0),
  dailyUsage: real("daily_usage").notNull().default(0),
  leadTime: integer("lead_time").notNull().default(1),
  safetyStock: integer("safety_stock").notNull().default(0),
  seasonalRequirements: jsonb("seasonal_requirements").$type<SeasonalRequirement[]>().notNull().default([]),
  menuTags: jsonb("menu_tags").$type<string[]>().notNull().default([]),
  checkDate: varchar("check_date", { length: 20 }),
  orderStatus: varchar("order_status", { length: 20 }).notNull().default("normal"),
  orderedQuantity: real("ordered_quantity"),
  orderedAt: varchar("ordered_at", { length: 30 }),
  supplierId: varchar("supplier_id", { length: 36 }),
  isFavorite: integer("is_favorite").notNull().default(0),
});

// Infer types from tables
export type Supplier = typeof suppliers.$inferSelect;
export type InsertSupplier = typeof suppliers.$inferInsert;

export type MenuTag = typeof menuTags.$inferSelect;
export type InsertMenuTag = typeof menuTags.$inferInsert;

export type SubCategory = typeof subCategories.$inferSelect;
export type InsertSubCategory = typeof subCategories.$inferInsert;

export type InventoryItem = typeof inventoryItems.$inferSelect;
export type InsertInventoryItem = typeof inventoryItems.$inferInsert;

// Zod schemas for validation
export const insertSupplierSchema = createInsertSchema(suppliers).omit({ id: true });
export const insertMenuTagSchema = createInsertSchema(menuTags).omit({ id: true });
export const insertSubCategorySchema = createInsertSchema(subCategories).omit({ id: true });
export const insertInventoryItemSchema = createInsertSchema(inventoryItems, {
  seasonalRequirements: z.array(z.object({
    season: z.enum(["winter", "spring", "summer", "fall"]),
    dailyUsage: z.number().min(0),
    leadTime: z.number().min(0),
    safetyStock: z.number().min(0),
    requiredStock: z.number().min(0),
  })),
  menuTags: z.array(z.string()),
});

// Helper functions
export function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1;
  if (month >= 12 || month <= 2) return "winter";
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  return "fall";
}

export function getSeasonalData(item: InventoryItem, season: Season): SeasonalRequirement | undefined {
  const reqs = item.seasonalRequirements as SeasonalRequirement[];
  return reqs?.find(r => r.season === season);
}

export function getRequiredStock(item: InventoryItem, season: Season): number {
  const req = getSeasonalData(item, season);
  return req?.requiredStock ?? 0;
}

export function getDailyUsage(item: InventoryItem, season: Season): number {
  const req = getSeasonalData(item, season);
  return req?.dailyUsage ?? item.dailyUsage ?? 0;
}

export function getLeadTime(item: InventoryItem, season: Season): number {
  const req = getSeasonalData(item, season);
  return req?.leadTime ?? item.leadTime ?? 1;
}

export function getSafetyStock(item: InventoryItem, season: Season): number {
  const req = getSeasonalData(item, season);
  return req?.safetyStock ?? item.safetyStock ?? 0;
}

export function needsOrder(item: InventoryItem, season: Season): boolean {
  const required = getRequiredStock(item, season);
  return item.currentStock < required && item.orderStatus !== "ordered";
}

export function getOrderQuantity(item: InventoryItem, season: Season): number {
  const required = getRequiredStock(item, season);
  const deficit = required - item.currentStock;
  return deficit > 0 ? deficit : 0;
}

// Legacy interface types for compatibility
export interface AppSettings {
  selectedTeam: Team;
  selectedSeason: Season;
}

export interface User {
  id: string;
  username: string;
  password: string;
}

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
