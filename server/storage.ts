import { randomUUID } from "crypto";
import { eq, and, sql } from "drizzle-orm";
import { db } from "./db";
import { 
  inventoryItems, 
  menuTags, 
  subCategories, 
  suppliers,
  itemOrders,
  type InventoryItem,
  type InsertInventoryItem,
  type MenuTag,
  type InsertMenuTag,
  type SubCategory,
  type InsertSubCategory,
  type Supplier,
  type InsertSupplier,
  type ItemOrder,
  type InsertItemOrder,
  type Team,
  type MainCategory
} from "@shared/schema";
import { fullInventoryData } from "./seed-data";

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
  deleteSubCategory(id: string): Promise<boolean>;
  
  getSuppliers(team: Team): Promise<Supplier[]>;
  createSupplier(supplier: InsertSupplier): Promise<Supplier>;
  deleteSupplier(id: string): Promise<boolean>;
  
  getOrdersByItemId(itemId: string): Promise<ItemOrder[]>;
  getPendingOrdersByItemId(itemId: string): Promise<ItemOrder[]>;
  getAllPendingOrders(): Promise<ItemOrder[]>;
  createOrder(order: InsertItemOrder): Promise<ItemOrder>;
  updateOrder(id: string, updates: Partial<ItemOrder>): Promise<ItemOrder | undefined>;
  deleteOrder(id: string): Promise<boolean>;
  
  seedDataIfEmpty(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getItems(team: Team): Promise<InventoryItem[]> {
    const items = await db.select().from(inventoryItems).where(eq(inventoryItems.team, team));
    return items as InventoryItem[];
  }

  async getItem(id: string): Promise<InventoryItem | undefined> {
    const [item] = await db.select().from(inventoryItems).where(eq(inventoryItems.id, id));
    return item as InventoryItem | undefined;
  }

  async createItem(insertItem: InsertInventoryItem): Promise<InventoryItem> {
    const id = randomUUID();
    const [item] = await db.insert(inventoryItems).values({
      ...insertItem,
      id,
      storageType: insertItem.storageType ?? null,
      checkDate: insertItem.checkDate ?? null,
      orderedQuantity: insertItem.orderedQuantity ?? null,
      orderedAt: insertItem.orderedAt ?? null,
      supplierId: insertItem.supplierId ?? null,
    }).returning();
    return item as InventoryItem;
  }

  async updateItem(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem | undefined> {
    const { id: _, ...safeUpdates } = updates as any;
    const [updated] = await db.update(inventoryItems)
      .set(safeUpdates)
      .where(eq(inventoryItems.id, id))
      .returning();
    return updated as InventoryItem | undefined;
  }

  async deleteItem(id: string): Promise<boolean> {
    const result = await db.delete(inventoryItems).where(eq(inventoryItems.id, id)).returning();
    return result.length > 0;
  }

  async bulkUpdateItems(updates: { id: string; [key: string]: any }[]): Promise<void> {
    for (const update of updates) {
      const { id, ...changes } = update;
      await db.update(inventoryItems).set(changes).where(eq(inventoryItems.id, id));
    }
  }

  async getTags(team?: Team): Promise<MenuTag[]> {
    if (team) {
      return await db.select().from(menuTags).where(eq(menuTags.team, team));
    }
    return await db.select().from(menuTags);
  }

  async createTag(insertTag: InsertMenuTag): Promise<MenuTag> {
    const id = randomUUID();
    const [tag] = await db.insert(menuTags).values({ ...insertTag, id }).returning();
    return tag;
  }

  async deleteTag(id: string): Promise<boolean> {
    const result = await db.delete(menuTags).where(eq(menuTags.id, id)).returning();
    if (result.length > 0) {
      await db.execute(sql`
        UPDATE inventory_items 
        SET menu_tags = COALESCE(
          (SELECT jsonb_agg(elem) 
           FROM jsonb_array_elements(menu_tags) elem 
           WHERE elem #>> '{}' != ${id}),
          '[]'::jsonb
        )
        WHERE menu_tags @> ${JSON.stringify([id])}::jsonb
      `);
    }
    return result.length > 0;
  }

  async getSubCategories(team: Team, mainCategory?: MainCategory): Promise<SubCategory[]> {
    if (mainCategory) {
      return await db.select().from(subCategories)
        .where(and(eq(subCategories.team, team), eq(subCategories.mainCategory, mainCategory)));
    }
    return await db.select().from(subCategories).where(eq(subCategories.team, team));
  }

  async createSubCategory(insertSubCategory: InsertSubCategory): Promise<SubCategory> {
    const id = randomUUID();
    const [subCategory] = await db.insert(subCategories).values({ ...insertSubCategory, id }).returning();
    return subCategory;
  }

  async getSuppliers(team: Team): Promise<Supplier[]> {
    return await db.select().from(suppliers).where(eq(suppliers.team, team));
  }

  async createSupplier(insertSupplier: InsertSupplier): Promise<Supplier> {
    const id = randomUUID();
    const [supplier] = await db.insert(suppliers).values({ ...insertSupplier, id }).returning();
    return supplier;
  }

  async deleteSubCategory(id: string): Promise<boolean> {
    const result = await db.delete(subCategories).where(eq(subCategories.id, id)).returning();
    return result.length > 0;
  }

  async deleteSupplier(id: string): Promise<boolean> {
    const result = await db.delete(suppliers).where(eq(suppliers.id, id)).returning();
    return result.length > 0;
  }

  async getOrdersByItemId(itemId: string): Promise<ItemOrder[]> {
    return await db.select().from(itemOrders).where(eq(itemOrders.itemId, itemId));
  }

  async getPendingOrdersByItemId(itemId: string): Promise<ItemOrder[]> {
    return await db.select().from(itemOrders)
      .where(and(eq(itemOrders.itemId, itemId), eq(itemOrders.status, "pending")));
  }

  async getAllPendingOrders(): Promise<ItemOrder[]> {
    return await db.select().from(itemOrders).where(eq(itemOrders.status, "pending"));
  }

  async createOrder(insertOrder: InsertItemOrder): Promise<ItemOrder> {
    const id = randomUUID();
    const [order] = await db.insert(itemOrders).values({
      ...insertOrder,
      id,
      receivedAt: insertOrder.receivedAt ?? null,
      notes: insertOrder.notes ?? null,
    }).returning();
    return order;
  }

  async updateOrder(id: string, updates: Partial<ItemOrder>): Promise<ItemOrder | undefined> {
    const { id: _, ...safeUpdates } = updates as any;
    const [updated] = await db.update(itemOrders)
      .set(safeUpdates)
      .where(eq(itemOrders.id, id))
      .returning();
    return updated;
  }

  async deleteOrder(id: string): Promise<boolean> {
    const result = await db.delete(itemOrders).where(eq(itemOrders.id, id)).returning();
    return result.length > 0;
  }

  async seedDataIfEmpty(): Promise<void> {
    console.log("Checking database for reference data...");
    
    // Always check reference tables first - they're needed for the app to work
    const existingTags = await db.select().from(menuTags).limit(1);
    const existingSubCategories = await db.select().from(subCategories).limit(1);
    const existingSuppliers = await db.select().from(suppliers).limit(1);
    
    const needsTags = existingTags.length === 0;
    const needsSubCategories = existingSubCategories.length === 0;
    const needsSuppliers = existingSuppliers.length === 0;
    
    // Check if inventory items exist
    const existingItems = await db.select().from(inventoryItems).limit(1);
    const needsInventory = existingItems.length === 0;
    
    if (!needsTags && !needsSubCategories && !needsSuppliers && !needsInventory) {
      console.log("Database already has all data, skipping seed");
      return;
    }
    
    console.log(`Seeding: tags=${needsTags}, subcategories=${needsSubCategories}, suppliers=${needsSuppliers}, inventory=${needsInventory}`);

    // Seed Menu Tags
    const kitchenTags = [
      { id: "tag-k1", team: "kitchen", name: "코티지파이", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" },
      { id: "tag-k2", team: "kitchen", name: "까망베르치즈구이", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
      { id: "tag-k3", team: "kitchen", name: "올리브파스타", color: "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300" },
      { id: "tag-k4", team: "kitchen", name: "잠봉파스타", color: "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300" },
      { id: "tag-k5", team: "kitchen", name: "프렌치토스트", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
      { id: "tag-k6", team: "kitchen", name: "토마토스프", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
      { id: "tag-k7", team: "kitchen", name: "꿀대구", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
      { id: "tag-k8", team: "kitchen", name: "뇨끼", color: "bg-stone-100 text-stone-700 dark:bg-stone-900/30 dark:text-stone-300" },
      { id: "tag-k9", team: "kitchen", name: "치즈팔레트", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
      { id: "tag-k10", team: "kitchen", name: "티라미슈", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
      { id: "tag-k11", team: "kitchen", name: "샐러드", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
      { id: "tag-k12", team: "kitchen", name: "브루기뇽", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
      { id: "tag-k13", team: "kitchen", name: "감바스", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300" },
      { id: "tag-k14", team: "kitchen", name: "어니언스프", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
      { id: "tag-k15", team: "kitchen", name: "트러플추가", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
      { id: "tag-k16", team: "kitchen", name: "오이스터", color: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300" },
      { id: "tag-k17", team: "kitchen", name: "수제바게트", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
    ];
    
    const cafeTags = [
      { id: "tag-c1", team: "cafe", name: "아메리카노", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
      { id: "tag-c2", team: "cafe", name: "카페라떼", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
      { id: "tag-c3", team: "cafe", name: "바닐라라떼", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
      { id: "tag-c4", team: "cafe", name: "카푸치노", color: "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300" },
      { id: "tag-c5", team: "cafe", name: "에스프레소", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
      { id: "tag-c6", team: "cafe", name: "모카", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300" },
    ];

    if (needsTags) {
      try {
        await db.insert(menuTags).values([...kitchenTags, ...cafeTags]);
        console.log("Seeded menu tags");
      } catch (e) {
        console.error("Error seeding tags:", e);
      }
    }

    // Seed SubCategories
    const kitchenSubCategories = [
      { id: "subcat-k1", team: "kitchen", mainCategory: "food", name: "유제품&치즈" },
      { id: "subcat-k2", team: "kitchen", mainCategory: "food", name: "가공육류&알" },
      { id: "subcat-k3", team: "kitchen", mainCategory: "food", name: "잎채소&허브류" },
      { id: "subcat-k4", team: "kitchen", mainCategory: "food", name: "채소&버섯&과일" },
      { id: "subcat-k5", team: "kitchen", mainCategory: "food", name: "소스&절임류" },
      { id: "subcat-k6", team: "kitchen", mainCategory: "food", name: "특수발주" },
      { id: "subcat-k7", team: "kitchen", mainCategory: "food", name: "냉동유제품" },
      { id: "subcat-k8", team: "kitchen", mainCategory: "food", name: "냉동육류" },
      { id: "subcat-k9", team: "kitchen", mainCategory: "food", name: "냉동해산물" },
      { id: "subcat-k10", team: "kitchen", mainCategory: "food", name: "냉동빵류" },
      { id: "subcat-k11", team: "kitchen", mainCategory: "food", name: "냉동기타" },
      { id: "subcat-k12", team: "kitchen", mainCategory: "food", name: "상온채소" },
      { id: "subcat-k13", team: "kitchen", mainCategory: "food", name: "가공식품" },
      { id: "subcat-k14", team: "kitchen", mainCategory: "food", name: "오일" },
      { id: "subcat-k15", team: "kitchen", mainCategory: "food", name: "캔" },
      { id: "subcat-k16", team: "kitchen", mainCategory: "food", name: "상온소스" },
      { id: "subcat-k17", team: "kitchen", mainCategory: "food", name: "건허브&향신료" },
      { id: "subcat-k18", team: "kitchen", mainCategory: "food", name: "견과류&곡물류" },
      { id: "subcat-k19", team: "kitchen", mainCategory: "food", name: "가루류" },
      { id: "subcat-k20", team: "kitchen", mainCategory: "non-food", name: "소모품" },
    ];

    const cafeSubCategories = [
      { id: "subcat-c1", team: "cafe", mainCategory: "food", name: "원두·커피" },
      { id: "subcat-c2", team: "cafe", mainCategory: "food", name: "시럽·소스" },
      { id: "subcat-c3", team: "cafe", mainCategory: "non-food", name: "소모품" },
    ];

    if (needsSubCategories) {
      try {
        await db.insert(subCategories).values([...kitchenSubCategories, ...cafeSubCategories]);
        console.log("Seeded subcategories");
      } catch (e) {
        console.error("Error seeding subcategories:", e);
      }
    }

    // Seed Suppliers
    const kitchenSuppliers = [
      { id: "sup-k1", team: "kitchen", name: "도레미", url: null },
      { id: "sup-k2", team: "kitchen", name: "쿠팡", url: "https://www.coupang.com" },
      { id: "sup-k3", team: "kitchen", name: "그린팜", url: null },
      { id: "sup-k4", team: "kitchen", name: "네이버", url: "https://shopping.naver.com" },
      { id: "sup-k5", team: "kitchen", name: "기타", url: null },
    ];

    const cafeSuppliers = [
      { id: "sup-c1", team: "cafe", name: "도레미", url: null },
      { id: "sup-c2", team: "cafe", name: "쿠팡", url: "https://www.coupang.com" },
      { id: "sup-c3", team: "cafe", name: "그린팜", url: null },
      { id: "sup-c4", team: "cafe", name: "네이버", url: "https://shopping.naver.com" },
      { id: "sup-c5", team: "cafe", name: "기타", url: null },
    ];

    if (needsSuppliers) {
      try {
        await db.insert(suppliers).values([...kitchenSuppliers, ...cafeSuppliers]);
        console.log("Seeded suppliers");
      } catch (e) {
        console.error("Error seeding suppliers:", e);
      }
    }

    // Seed inventory items with full production data
    if (needsInventory && fullInventoryData && fullInventoryData.length > 0) {
      try {
        // Insert in batches to avoid hitting limits
        const batchSize = 20;
        let insertedCount = 0;
        for (let i = 0; i < fullInventoryData.length; i += batchSize) {
          const batch = fullInventoryData.slice(i, i + batchSize);
          try {
            await db.insert(inventoryItems).values(batch as any[]);
            insertedCount += batch.length;
          } catch (batchError) {
            console.error(`Error inserting batch starting at index ${i}:`, batchError);
            // Try inserting one by one for this batch
            for (const item of batch) {
              try {
                await db.insert(inventoryItems).values(item as any);
                insertedCount++;
              } catch (itemError) {
                console.error(`Failed to insert item ${item.id}:`, itemError);
              }
            }
          }
        }
        console.log(`Database seeded with ${insertedCount}/${fullInventoryData.length} inventory items`);
      } catch (error) {
        console.error("Error seeding inventory items:", error);
      }
    }

    console.log("Database seeded with initial data");
  }
}

export const storage = new DatabaseStorage();
