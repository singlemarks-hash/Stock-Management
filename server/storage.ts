import { randomUUID } from "crypto";
import type { 
  InventoryItem, 
  InsertInventoryItem, 
  MenuTag, 
  InsertMenuTag,
  SubCategory,
  InsertSubCategory,
  Supplier,
  InsertSupplier,
  Team,
  Season,
  MainCategory
} from "@shared/schema";

export interface IStorage {
  getItems(team: Team): Promise<InventoryItem[]>;
  getItem(id: string): Promise<InventoryItem | undefined>;
  createItem(item: InsertInventoryItem): Promise<InventoryItem>;
  updateItem(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem | undefined>;
  deleteItem(id: string): Promise<boolean>;
  bulkUpdateItems(updates: { id: string; [key: string]: any }[]): Promise<void>;
  
  getTags(team?: Team): Promise<MenuTag[]>;
  createTag(tag: InsertMenuTag): Promise<MenuTag>;
  deleteTag(id: string): Promise<boolean>;
  
  getSubCategories(team: Team, mainCategory?: MainCategory): Promise<SubCategory[]>;
  createSubCategory(subCategory: InsertSubCategory): Promise<SubCategory>;
  
  getSuppliers(team: Team): Promise<Supplier[]>;
  createSupplier(supplier: InsertSupplier): Promise<Supplier>;
}

export class MemStorage implements IStorage {
  private items: Map<string, InventoryItem>;
  private tags: Map<string, MenuTag>;
  private subCategories: Map<string, SubCategory>;
  private suppliers: Map<string, Supplier>;

  constructor() {
    this.items = new Map();
    this.tags = new Map();
    this.subCategories = new Map();
    this.suppliers = new Map();
    this.seedData();
  }

  private seedData() {
    const kitchenTags: MenuTag[] = [
      { id: "tag-k1", team: "kitchen", name: "스테이크", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
      { id: "tag-k2", team: "kitchen", name: "파스타", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
      { id: "tag-k3", team: "kitchen", name: "샐러드", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
      { id: "tag-k4", team: "kitchen", name: "수프", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" },
      { id: "tag-k5", team: "kitchen", name: "리조또", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
    ];
    
    const cafeTags: MenuTag[] = [
      { id: "tag-c1", team: "cafe", name: "아메리카노", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
      { id: "tag-c2", team: "cafe", name: "카페라떼", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
      { id: "tag-c3", team: "cafe", name: "바닐라라떼", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
      { id: "tag-c4", team: "cafe", name: "카푸치노", color: "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300" },
      { id: "tag-c5", team: "cafe", name: "에스프레소", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
      { id: "tag-c6", team: "cafe", name: "모카", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300" },
    ];

    [...kitchenTags, ...cafeTags].forEach(tag => this.tags.set(tag.id, tag));

    const kitchenSubCategories: SubCategory[] = [
      { id: "subcat-k1", team: "kitchen", mainCategory: "food", name: "유제품·치즈" },
      { id: "subcat-k2", team: "kitchen", mainCategory: "food", name: "잎채소&허브류" },
      { id: "subcat-k3", team: "kitchen", mainCategory: "food", name: "해산물" },
      { id: "subcat-k4", team: "kitchen", mainCategory: "food", name: "육류" },
      { id: "subcat-k5", team: "kitchen", mainCategory: "food", name: "오일·소스" },
      { id: "subcat-k6", team: "kitchen", mainCategory: "food", name: "면류·곡류" },
      { id: "subcat-k7", team: "kitchen", mainCategory: "non-food", name: "위생용품" },
      { id: "subcat-k8", team: "kitchen", mainCategory: "non-food", name: "청소용품" },
    ];

    const cafeSubCategories: SubCategory[] = [
      { id: "subcat-c1", team: "cafe", mainCategory: "food", name: "원두·커피" },
      { id: "subcat-c2", team: "cafe", mainCategory: "food", name: "시럽·소스" },
      { id: "subcat-c3", team: "cafe", mainCategory: "non-food", name: "포장용품" },
    ];

    [...kitchenSubCategories, ...cafeSubCategories].forEach(sc => this.subCategories.set(sc.id, sc));

    const kitchenSuppliers: Supplier[] = [
      { id: "sup-k1", team: "kitchen", name: "도레미", url: null },
      { id: "sup-k2", team: "kitchen", name: "쿠팡", url: "https://www.coupang.com" },
      { id: "sup-k3", team: "kitchen", name: "그린팜", url: null },
      { id: "sup-k4", team: "kitchen", name: "네이버", url: "https://shopping.naver.com" },
      { id: "sup-k5", team: "kitchen", name: "기타", url: null },
    ];

    const cafeSuppliers: Supplier[] = [
      { id: "sup-c1", team: "cafe", name: "도레미", url: null },
      { id: "sup-c2", team: "cafe", name: "쿠팡", url: "https://www.coupang.com" },
      { id: "sup-c3", team: "cafe", name: "그린팜", url: null },
      { id: "sup-c4", team: "cafe", name: "네이버", url: "https://shopping.naver.com" },
      { id: "sup-c5", team: "cafe", name: "기타", url: null },
    ];

    [...kitchenSuppliers, ...cafeSuppliers].forEach(s => this.suppliers.set(s.id, s));

    const kitchenItems: InventoryItem[] = [
      {
        id: "item-1",
        team: "kitchen",
        name: "우유",
        mainCategory: "food",
        storageType: "refrigerated",
        subCategory: "유제품·치즈",
        unit: "L",
        currentStock: 5,
        dailyUsage: 2,
        leadTime: 1,
        safetyStock: 3,
        seasonalRequirements: [
          { season: "winter", requiredStock: 8 },
          { season: "spring", requiredStock: 10 },
          { season: "summer", requiredStock: 15 },
          { season: "fall", requiredStock: 10 },
        ],
        menuTags: ["tag-k2", "tag-k3"],
        checkDate: "2026-01-10",
        orderStatus: "need-order",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-k1",
      },
      {
        id: "item-2",
        team: "kitchen",
        name: "생크림",
        mainCategory: "food",
        storageType: "refrigerated",
        subCategory: "유제품·치즈",
        unit: "L",
        currentStock: 2,
        dailyUsage: 0.5,
        leadTime: 1,
        safetyStock: 1,
        seasonalRequirements: [
          { season: "winter", requiredStock: 3 },
          { season: "spring", requiredStock: 4 },
          { season: "summer", requiredStock: 5 },
          { season: "fall", requiredStock: 4 },
        ],
        menuTags: ["tag-k5"],
        checkDate: "2026-01-10",
        orderStatus: "normal",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-k1",
      },
      {
        id: "item-3",
        team: "kitchen",
        name: "체다치즈",
        mainCategory: "food",
        storageType: "refrigerated",
        subCategory: "유제품·치즈",
        unit: "kg",
        currentStock: 1,
        dailyUsage: 0.3,
        leadTime: 2,
        safetyStock: 1,
        seasonalRequirements: [
          { season: "winter", requiredStock: 2 },
          { season: "spring", requiredStock: 2 },
          { season: "summer", requiredStock: 2 },
          { season: "fall", requiredStock: 2 },
        ],
        menuTags: ["tag-k2", "tag-k3"],
        checkDate: "2026-01-09",
        orderStatus: "ordered",
        orderedQuantity: 1,
        orderedAt: "2026-01-10T09:30:00.000Z",
        supplierId: "sup-k2",
      },
      {
        id: "item-4",
        team: "kitchen",
        name: "바질",
        mainCategory: "food",
        storageType: "refrigerated",
        subCategory: "잎채소&허브류",
        unit: "묶음",
        currentStock: 3,
        dailyUsage: 1,
        leadTime: 1,
        safetyStock: 2,
        seasonalRequirements: [
          { season: "winter", requiredStock: 2 },
          { season: "spring", requiredStock: 4 },
          { season: "summer", requiredStock: 5 },
          { season: "fall", requiredStock: 3 },
        ],
        menuTags: ["tag-k2", "tag-k3"],
        checkDate: "2026-01-10",
        orderStatus: "normal",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-k3",
      },
      {
        id: "item-5",
        team: "kitchen",
        name: "양상추",
        mainCategory: "food",
        storageType: "refrigerated",
        subCategory: "잎채소&허브류",
        unit: "kg",
        currentStock: 2,
        dailyUsage: 1,
        leadTime: 1,
        safetyStock: 2,
        seasonalRequirements: [
          { season: "winter", requiredStock: 3 },
          { season: "spring", requiredStock: 5 },
          { season: "summer", requiredStock: 6 },
          { season: "fall", requiredStock: 4 },
        ],
        menuTags: ["tag-k3"],
        checkDate: "2026-01-10",
        orderStatus: "normal",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-k3",
      },
      {
        id: "item-6",
        team: "kitchen",
        name: "새우",
        mainCategory: "food",
        storageType: "frozen",
        subCategory: "해산물",
        unit: "kg",
        currentStock: 3,
        dailyUsage: 0.5,
        leadTime: 2,
        safetyStock: 2,
        seasonalRequirements: [
          { season: "winter", requiredStock: 4 },
          { season: "spring", requiredStock: 5 },
          { season: "summer", requiredStock: 6 },
          { season: "fall", requiredStock: 5 },
        ],
        menuTags: ["tag-k2"],
        checkDate: "2026-01-08",
        orderStatus: "need-order",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-k1",
      },
      {
        id: "item-7",
        team: "kitchen",
        name: "소고기 안심",
        mainCategory: "food",
        storageType: "frozen",
        subCategory: "육류",
        unit: "kg",
        currentStock: 5,
        dailyUsage: 1,
        leadTime: 2,
        safetyStock: 3,
        seasonalRequirements: [
          { season: "winter", requiredStock: 8 },
          { season: "spring", requiredStock: 6 },
          { season: "summer", requiredStock: 5 },
          { season: "fall", requiredStock: 6 },
        ],
        menuTags: ["tag-k1"],
        checkDate: "2026-01-10",
        orderStatus: "need-order",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-k1",
      },
      {
        id: "item-8",
        team: "kitchen",
        name: "올리브오일",
        mainCategory: "food",
        storageType: "room-temp",
        subCategory: "오일·소스",
        unit: "L",
        currentStock: 4,
        dailyUsage: 0.2,
        leadTime: 3,
        safetyStock: 1,
        seasonalRequirements: [
          { season: "winter", requiredStock: 3 },
          { season: "spring", requiredStock: 3 },
          { season: "summer", requiredStock: 3 },
          { season: "fall", requiredStock: 3 },
        ],
        menuTags: ["tag-k1", "tag-k2", "tag-k3"],
        checkDate: "2026-01-10",
        orderStatus: "normal",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-k2",
      },
      {
        id: "item-9",
        team: "kitchen",
        name: "파스타면",
        mainCategory: "food",
        storageType: "room-temp",
        subCategory: "면류·곡류",
        unit: "kg",
        currentStock: 8,
        dailyUsage: 1,
        leadTime: 3,
        safetyStock: 5,
        seasonalRequirements: [
          { season: "winter", requiredStock: 10 },
          { season: "spring", requiredStock: 10 },
          { season: "summer", requiredStock: 8 },
          { season: "fall", requiredStock: 10 },
        ],
        menuTags: ["tag-k2"],
        checkDate: "2026-01-10",
        orderStatus: "need-order",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-k2",
      },
      {
        id: "item-10",
        team: "kitchen",
        name: "일회용 장갑",
        mainCategory: "non-food",
        storageType: null,
        subCategory: "위생용품",
        unit: "박스",
        currentStock: 2,
        dailyUsage: 0.1,
        leadTime: 5,
        safetyStock: 1,
        seasonalRequirements: [
          { season: "winter", requiredStock: 3 },
          { season: "spring", requiredStock: 3 },
          { season: "summer", requiredStock: 3 },
          { season: "fall", requiredStock: 3 },
        ],
        menuTags: [],
        checkDate: "2026-01-05",
        orderStatus: "need-order",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-k2",
      },
      {
        id: "item-11",
        team: "kitchen",
        name: "주방세제",
        mainCategory: "non-food",
        storageType: null,
        subCategory: "청소용품",
        unit: "개",
        currentStock: 4,
        dailyUsage: 0.05,
        leadTime: 5,
        safetyStock: 1,
        seasonalRequirements: [
          { season: "winter", requiredStock: 2 },
          { season: "spring", requiredStock: 2 },
          { season: "summer", requiredStock: 2 },
          { season: "fall", requiredStock: 2 },
        ],
        menuTags: [],
        checkDate: "2026-01-10",
        orderStatus: "normal",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-k2",
      },
    ];

    const cafeItems: InventoryItem[] = [
      {
        id: "item-cafe-1",
        team: "cafe",
        name: "원두 (에티오피아)",
        mainCategory: "food",
        storageType: "room-temp",
        subCategory: "원두·커피",
        unit: "kg",
        currentStock: 5,
        dailyUsage: 1,
        leadTime: 3,
        safetyStock: 5,
        seasonalRequirements: [
          { season: "winter", requiredStock: 10 },
          { season: "spring", requiredStock: 8 },
          { season: "summer", requiredStock: 6 },
          { season: "fall", requiredStock: 8 },
        ],
        menuTags: ["tag-c1", "tag-c5"],
        checkDate: "2026-01-10",
        orderStatus: "need-order",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-c1",
      },
      {
        id: "item-cafe-2",
        team: "cafe",
        name: "바닐라 시럽",
        mainCategory: "food",
        storageType: "room-temp",
        subCategory: "시럽·소스",
        unit: "병",
        currentStock: 3,
        dailyUsage: 0.5,
        leadTime: 2,
        safetyStock: 2,
        seasonalRequirements: [
          { season: "winter", requiredStock: 4 },
          { season: "spring", requiredStock: 5 },
          { season: "summer", requiredStock: 6 },
          { season: "fall", requiredStock: 5 },
        ],
        menuTags: ["tag-c3"],
        checkDate: "2026-01-10",
        orderStatus: "normal",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-c2",
      },
      {
        id: "item-cafe-3",
        team: "cafe",
        name: "컵 (16oz)",
        mainCategory: "non-food",
        storageType: null,
        subCategory: "포장용품",
        unit: "박스",
        currentStock: 5,
        dailyUsage: 0.3,
        leadTime: 5,
        safetyStock: 3,
        seasonalRequirements: [
          { season: "winter", requiredStock: 4 },
          { season: "spring", requiredStock: 6 },
          { season: "summer", requiredStock: 8 },
          { season: "fall", requiredStock: 5 },
        ],
        menuTags: [],
        checkDate: "2026-01-09",
        orderStatus: "normal",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-c2",
      },
    ];

    [...kitchenItems, ...cafeItems].forEach(item => this.items.set(item.id, item));
  }

  async getItems(team: Team): Promise<InventoryItem[]> {
    return Array.from(this.items.values()).filter(item => item.team === team);
  }

  async getItem(id: string): Promise<InventoryItem | undefined> {
    return this.items.get(id);
  }

  async createItem(insertItem: InsertInventoryItem): Promise<InventoryItem> {
    const id = randomUUID();
    const item: InventoryItem = { 
      ...insertItem, 
      id,
      storageType: insertItem.storageType ?? null,
      checkDate: insertItem.checkDate ?? null,
      orderedQuantity: insertItem.orderedQuantity ?? null,
      orderedAt: insertItem.orderedAt ?? null,
      supplierId: insertItem.supplierId ?? null,
    };
    this.items.set(id, item);
    return item;
  }

  async updateItem(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem | undefined> {
    const item = this.items.get(id);
    if (!item) return undefined;
    
    const { id: _, ...safeUpdates } = updates as any;
    const updated = { ...item, ...safeUpdates };
    this.items.set(id, updated);
    return updated;
  }

  async deleteItem(id: string): Promise<boolean> {
    return this.items.delete(id);
  }

  async bulkUpdateItems(updates: { id: string; [key: string]: any }[]): Promise<void> {
    for (const update of updates) {
      const { id, ...changes } = update;
      const item = this.items.get(id);
      if (item) {
        this.items.set(id, { ...item, ...changes });
      }
    }
  }

  async getTags(team?: Team): Promise<MenuTag[]> {
    const allTags = Array.from(this.tags.values());
    if (team) {
      return allTags.filter(tag => tag.team === team);
    }
    return allTags;
  }

  async createTag(insertTag: InsertMenuTag): Promise<MenuTag> {
    const id = randomUUID();
    const tag: MenuTag = { ...insertTag, id };
    this.tags.set(id, tag);
    return tag;
  }

  async deleteTag(id: string): Promise<boolean> {
    return this.tags.delete(id);
  }

  async getSubCategories(team: Team, mainCategory?: MainCategory): Promise<SubCategory[]> {
    const allSubCategories = Array.from(this.subCategories.values());
    return allSubCategories.filter(sc => {
      if (sc.team !== team) return false;
      if (mainCategory && sc.mainCategory !== mainCategory) return false;
      return true;
    });
  }

  async createSubCategory(insertSubCategory: InsertSubCategory): Promise<SubCategory> {
    const id = randomUUID();
    const subCategory: SubCategory = { ...insertSubCategory, id };
    this.subCategories.set(id, subCategory);
    return subCategory;
  }

  async getSuppliers(team: Team): Promise<Supplier[]> {
    const allSuppliers = Array.from(this.suppliers.values());
    return allSuppliers.filter(s => s.team === team);
  }

  async createSupplier(insertSupplier: InsertSupplier): Promise<Supplier> {
    const id = randomUUID();
    const supplier: Supplier = { ...insertSupplier, id };
    this.suppliers.set(id, supplier);
    return supplier;
  }
}

export const storage = new MemStorage();
