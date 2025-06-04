import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const documentaries = pgTable("documentaries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  youtubeId: text("youtube_id").notNull(),
  thumbnail: text("thumbnail").notNull(),
  duration: integer("duration").notNull(), // in minutes
  category: text("category").notNull(),
  featured: boolean("featured").default(false),
  rating: integer("rating").default(5), // 1-5 scale
  publishedAt: text("published_at").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  // Add any relations if needed in the future
}));

export const documentariesRelations = relations(documentaries, ({ one }) => ({
  // Add any relations if needed in the future
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDocumentarySchema = createInsertSchema(documentaries).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Documentary = typeof documentaries.$inferSelect;
export type InsertDocumentary = z.infer<typeof insertDocumentarySchema>;

export const categories = [
  "all",
  "wellbeing",
  "mindfulness", 
  "inspiration",
  "meditation",
  "healing"
] as const;

export type Category = typeof categories[number];
