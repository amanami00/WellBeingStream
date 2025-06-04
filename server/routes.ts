import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all documentaries
  app.get("/api/documentaries", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let documentaries;
      
      if (search && typeof search === "string") {
        documentaries = await storage.searchDocumentaries(search);
      } else if (category && typeof category === "string") {
        documentaries = await storage.getDocumentariesByCategory(category);
      } else {
        documentaries = await storage.getDocumentaries();
      }
      
      res.json(documentaries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documentaries" });
    }
  });

  // Get featured documentary
  app.get("/api/documentaries/featured", async (req, res) => {
    try {
      const featured = await storage.getFeaturedDocumentary();
      if (!featured) {
        return res.status(404).json({ message: "No featured documentary found" });
      }
      res.json(featured);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured documentary" });
    }
  });

  // Get single documentary
  app.get("/api/documentaries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid documentary ID" });
      }
      
      const documentary = await storage.getDocumentary(id);
      if (!documentary) {
        return res.status(404).json({ message: "Documentary not found" });
      }
      
      res.json(documentary);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documentary" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
