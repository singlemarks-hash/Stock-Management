import { z } from "zod";

export type Season = "winter" | "spring" | "summer" | "fall";
export type Team = "cafe" | "kitchen";
export type MainCategory = "food" | "non-food";
export type StorageType = "refrigerated" | "frozen" | "room-temp";
export type OrderStatus = "none" | "ordered" | "delivered";

export const seasonLabels: Record<Season, string> = {
  winter: "겨울 시즌",
  spring: "봄 시즌",
  summer: "여름 시즌",
  fall: "가을 시즌",
};

export const seasonEmojis: Record<Season, string> = {
  winter: "❄️",
  spring: "🌸",
  summer: "☀️",
  fall: "🍂",
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

export interface MenuTag {
  id: string;
  team: Team;
  name: string;
  color: string;
}

export interface SeasonalRequirement {
  season: Season;
  requiredStock: number;
}

export interface InventoryItem {
  id: string;
  team: Team;
  name: string;
  mainCategory: MainCategory;
  storageType: StorageType | null;
  subCategory: string;
  unit: string;
  currentStock: number;
  seasonalRequirements: SeasonalRequirement[];
  menuTags: string[];
  checkDate: string | null;
  orderStatus: OrderStatus;
  orderedQuantity: number | null;
  orderedAt: string | null;
  deliveredAt: string | null;
}

export interface AppSettings {
  selectedTeam: Team;
  selectedSeason: Season;
}

export const insertInventoryItemSchema = z.object({
  team: z.enum(["cafe", "kitchen"]),
  name: z.string().min(1, "이름을 입력해주세요"),
  mainCategory: z.enum(["food", "non-food"]),
  storageType: z.enum(["refrigerated", "frozen", "room-temp"]).nullable(),
  subCategory: z.string(),
  unit: z.string().min(1, "단위를 입력해주세요"),
  currentStock: z.number().min(0, "재고는 0 이상이어야 합니다"),
  seasonalRequirements: z.array(z.object({
    season: z.enum(["winter", "spring", "summer", "fall"]),
    requiredStock: z.number().min(0),
  })),
  menuTags: z.array(z.string()),
  checkDate: z.string().nullable(),
  orderStatus: z.enum(["none", "ordered", "delivered"]),
  orderedQuantity: z.number().nullable(),
  orderedAt: z.string().nullable(),
  deliveredAt: z.string().nullable(),
});

export type InsertInventoryItem = z.infer<typeof insertInventoryItemSchema>;

export const insertMenuTagSchema = z.object({
  team: z.enum(["cafe", "kitchen"]),
  name: z.string().min(1, "태그 이름을 입력해주세요"),
  color: z.string(),
});

export type InsertMenuTag = z.infer<typeof insertMenuTagSchema>;

export function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1;
  if (month >= 12 || month <= 2) return "winter";
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  return "fall";
}

export function getRequiredStock(item: InventoryItem, season: Season): number {
  const req = item.seasonalRequirements.find(r => r.season === season);
  return req?.requiredStock ?? 0;
}

export function needsOrder(item: InventoryItem, season: Season): boolean {
  const required = getRequiredStock(item, season);
  return item.currentStock < required && item.orderStatus === "none";
}

export function getOrderQuantity(item: InventoryItem, season: Season): number {
  const required = getRequiredStock(item, season);
  const deficit = required - item.currentStock;
  return deficit > 0 ? deficit : 0;
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
