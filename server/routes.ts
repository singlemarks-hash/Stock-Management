import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertInventoryItemSchema, 
  insertMenuTagSchema,
  insertSubCategorySchema,
  insertSupplierSchema,
  insertItemOrderSchema,
  type Team,
  type MainCategory
} from "@shared/schema";
import { z } from "zod";
import { randomUUID } from "crypto";

const updateInventoryItemSchema = insertInventoryItemSchema.partial();

const createMenuTagSchema = insertMenuTagSchema.omit({ id: true });

const bulkUpdateSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
  }).passthrough()),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/inventory", async (req, res) => {
    try {
      const team = (req.query.team as Team) || "kitchen";
      if (team !== "kitchen" && team !== "cafe") {
        return res.status(400).json({ error: "Invalid team parameter" });
      }
      const items = await storage.getItems(team);
      const tags = await storage.getTags(team);
      res.json({ items, tags });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inventory" });
    }
  });

  app.get("/api/inventory/:id", async (req, res) => {
    try {
      const item = await storage.getItem(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch item" });
    }
  });

  app.post("/api/inventory", async (req, res) => {
    try {
      const parsed = insertInventoryItemSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid request body", 
          details: parsed.error.flatten() 
        });
      }
      
      if (parsed.data.menuTags && parsed.data.menuTags.length > 0) {
        const teamTags = await storage.getTags(parsed.data.team as Team);
        const teamTagIds = new Set(teamTags.map(t => t.id));
        const invalidTags = parsed.data.menuTags.filter(id => !teamTagIds.has(id));
        if (invalidTags.length > 0) {
          return res.status(400).json({ 
            error: "Invalid tag IDs: tags must belong to the same team as the item" 
          });
        }
      }
      
      const item = await storage.createItem(parsed.data);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to create item" });
    }
  });

  app.patch("/api/inventory/:id", async (req, res) => {
    try {
      const parsed = updateInventoryItemSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid request body", 
          details: parsed.error.flatten() 
        });
      }
      
      const existingItem = await storage.getItem(req.params.id);
      if (!existingItem) {
        return res.status(404).json({ error: "Item not found" });
      }
      
      if (parsed.data.menuTags && parsed.data.menuTags.length > 0) {
        const teamTags = await storage.getTags(existingItem.team as Team);
        const teamTagIds = new Set(teamTags.map(t => t.id));
        const invalidTags = parsed.data.menuTags.filter(id => !teamTagIds.has(id));
        if (invalidTags.length > 0) {
          return res.status(400).json({ 
            error: "Invalid tag IDs: tags must belong to the same team as the item" 
          });
        }
      }
      
      const item = await storage.updateItem(req.params.id, parsed.data);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to update item" });
    }
  });

  app.delete("/api/inventory/:id", async (req, res) => {
    try {
      const success = await storage.deleteItem(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete item" });
    }
  });

  app.put("/api/inventory/bulk", async (req, res) => {
    try {
      const parsed = bulkUpdateSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid request body", 
          details: parsed.error.flatten() 
        });
      }
      
      const { items } = parsed.data;
      if (items && Array.isArray(items)) {
        const validatedUpdates: { id: string; [key: string]: any }[] = [];
        
        for (const item of items) {
          const { id, ...updates } = item;
          const partialParsed = updateInventoryItemSchema.safeParse(updates);
          
          if (partialParsed.success) {
            if (partialParsed.data.menuTags && partialParsed.data.menuTags.length > 0) {
              const existingItem = await storage.getItem(id);
              if (existingItem) {
                const teamTags = await storage.getTags(existingItem.team as Team);
                const teamTagIds = new Set(teamTags.map(t => t.id));
                const invalidTags = partialParsed.data.menuTags.filter(tagId => !teamTagIds.has(tagId));
                if (invalidTags.length > 0) {
                  return res.status(400).json({ 
                    error: `Invalid tag IDs for item ${id}: tags must belong to the same team as the item` 
                  });
                }
                validatedUpdates.push({ id, ...partialParsed.data });
              }
            } else {
              validatedUpdates.push({ id, ...partialParsed.data });
            }
          }
        }
        
        await storage.bulkUpdateItems(validatedUpdates);
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to bulk update items" });
    }
  });

  app.get("/api/tags", async (req, res) => {
    try {
      const team = req.query.team as Team | undefined;
      if (team && team !== "kitchen" && team !== "cafe") {
        return res.status(400).json({ error: "Invalid team parameter" });
      }
      const tags = await storage.getTags(team);
      res.json(tags);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tags" });
    }
  });

  app.post("/api/tags", async (req, res) => {
    try {
      const parsed = createMenuTagSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid request body", 
          details: parsed.error.flatten() 
        });
      }
      const tagWithId = {
        ...parsed.data,
        id: `tag-${randomUUID().split('-')[0]}`,
      };
      const tag = await storage.createTag(tagWithId);
      res.status(201).json(tag);
    } catch (error) {
      res.status(500).json({ error: "Failed to create tag" });
    }
  });

  app.patch("/api/tags/:id", async (req, res) => {
    try {
      const { color } = req.body;
      if (typeof color !== "string" || !/^#[0-9A-Fa-f]{6}$/.test(color)) {
        return res.status(400).json({ error: "Invalid color format. Use hex format like #ff0000" });
      }
      const tag = await storage.updateTag(req.params.id, { color });
      if (!tag) {
        return res.status(404).json({ error: "Tag not found" });
      }
      res.json(tag);
    } catch (error) {
      res.status(500).json({ error: "Failed to update tag" });
    }
  });

  app.delete("/api/tags/:id", async (req, res) => {
    try {
      const success = await storage.deleteTag(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Tag not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete tag" });
    }
  });

  app.get("/api/subcategories", async (req, res) => {
    try {
      const team = req.query.team as Team;
      const mainCategory = req.query.mainCategory as MainCategory | undefined;
      
      if (!team || (team !== "kitchen" && team !== "cafe")) {
        return res.status(400).json([]);
      }
      if (mainCategory && mainCategory !== "food" && mainCategory !== "non-food") {
        return res.status(400).json([]);
      }
      
      const subCategories = await storage.getSubCategories(team, mainCategory);
      res.json(subCategories || []);
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
      res.status(500).json([]);
    }
  });

  app.post("/api/subcategories", async (req, res) => {
    try {
      const parsed = insertSubCategorySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid request body", 
          details: parsed.error.flatten() 
        });
      }
      const subCategory = await storage.createSubCategory(parsed.data);
      res.status(201).json(subCategory);
    } catch (error) {
      res.status(500).json({ error: "Failed to create subcategory" });
    }
  });

  app.delete("/api/subcategories/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteSubCategory(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Subcategory not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete subcategory" });
    }
  });

  app.get("/api/suppliers", async (req, res) => {
    try {
      const team = req.query.team as Team;
      
      if (!team || (team !== "kitchen" && team !== "cafe")) {
        return res.status(400).json([]);
      }
      
      const suppliers = await storage.getSuppliers(team);
      res.json(suppliers || []);
    } catch (error) {
      console.error("Failed to fetch suppliers:", error);
      res.status(500).json([]);
    }
  });

  app.post("/api/suppliers", async (req, res) => {
    try {
      const parsed = insertSupplierSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid request body", 
          details: parsed.error.flatten() 
        });
      }
      const supplier = await storage.createSupplier(parsed.data);
      res.status(201).json(supplier);
    } catch (error) {
      res.status(500).json({ error: "Failed to create supplier" });
    }
  });

  app.delete("/api/suppliers/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteSupplier(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Supplier not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete supplier" });
    }
  });

  app.get("/api/orders", async (req, res) => {
    try {
      const itemId = req.query.itemId as string | undefined;
      const pendingOnly = req.query.pending === "true";
      
      if (itemId) {
        const orders = pendingOnly 
          ? await storage.getPendingOrdersByItemId(itemId)
          : await storage.getOrdersByItemId(itemId);
        return res.json(orders);
      }
      
      const orders = await storage.getAllPendingOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const parsed = insertItemOrderSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid request body", 
          details: parsed.error.flatten() 
        });
      }
      const order = await storage.createOrder(parsed.data);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.patch("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.updateOrder(req.params.id, req.body);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order" });
    }
  });

  app.delete("/api/orders/:id", async (req, res) => {
    try {
      const success = await storage.deleteOrder(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete order" });
    }
  });

  app.post("/api/orders/:id/deliver", async (req, res) => {
    try {
      const orderId = req.params.id;
      const { deliveredQuantity } = req.body;
      
      const orders = await storage.getAllPendingOrders();
      const order = orders.find(o => o.id === orderId);
      
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      const item = await storage.getItem(order.itemId);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      
      const quantityToAdd = deliveredQuantity ?? order.quantity;
      
      await storage.deleteOrder(orderId);
      
      const updatedItem = await storage.updateItem(order.itemId, {
        currentStock: item.currentStock + quantityToAdd,
      });
      
      res.json({ 
        success: true, 
        item: updatedItem,
        addedQuantity: quantityToAdd 
      });
    } catch (error) {
      console.error("Failed to deliver order:", error);
      res.status(500).json({ error: "Failed to deliver order" });
    }
  });

  return httpServer;
}
