import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertInventoryItemSchema, 
  insertMenuTagSchema,
  type Team 
} from "@shared/schema";
import { z } from "zod";

const updateInventoryItemSchema = insertInventoryItemSchema.partial();

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
      const tags = await storage.getTags();
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
      const item = await storage.updateItem(req.params.id, parsed.data);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
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
        const validatedUpdates = items.map(item => {
          const { id, ...updates } = item;
          const partialParsed = updateInventoryItemSchema.safeParse(updates);
          if (partialParsed.success) {
            return { id, ...partialParsed.data };
          }
          return { id };
        }).filter(item => Object.keys(item).length > 1);
        
        await storage.bulkUpdateItems(validatedUpdates);
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to bulk update items" });
    }
  });

  app.get("/api/tags", async (req, res) => {
    try {
      const tags = await storage.getTags();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tags" });
    }
  });

  app.post("/api/tags", async (req, res) => {
    try {
      const parsed = insertMenuTagSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid request body", 
          details: parsed.error.flatten() 
        });
      }
      const tag = await storage.createTag(parsed.data);
      res.status(201).json(tag);
    } catch (error) {
      res.status(500).json({ error: "Failed to create tag" });
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

  return httpServer;
}
