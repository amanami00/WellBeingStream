import { users, documentaries, type User, type InsertUser, type Documentary, type InsertDocumentary } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or, desc, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getDocumentaries(): Promise<Documentary[]>;
  getDocumentary(id: number): Promise<Documentary | undefined>;
  getDocumentariesByCategory(category: string): Promise<Documentary[]>;
  getFeaturedDocumentary(): Promise<Documentary | undefined>;
  searchDocumentaries(query: string): Promise<Documentary[]>;
  createDocumentary(documentary: InsertDocumentary): Promise<Documentary>;
  getCategories(): Promise<string[]>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.seedDocumentaries();
  }

  private async seedDocumentaries() {
    try {
      // Check if documentaries already exist
      const existingDocs = await db.select().from(documentaries).limit(1);
      if (existingDocs.length > 0) {
        return; // Already seeded
      }

      const seedData: InsertDocumentary[] = [
        {
          title: "Finding Inner Peace",
          description: "A transformative 18-minute journey exploring mindfulness practices that have helped thousands find clarity and emotional balance in our chaotic world.",
          youtubeId: "inpok4MKVLM",
          thumbnail: "https://img.youtube.com/vi/inpok4MKVLM/maxresdefault.jpg",
          duration: 18,
          category: "mindfulness",
          featured: true,
          rating: 5,
          publishedAt: "2024-01-15"
        },
        {
          title: "The Art of Breathing",
          description: "Ancient breathing techniques for modern stress relief",
          youtubeId: "YRPh_GaiL8s",
          thumbnail: "https://img.youtube.com/vi/YRPh_GaiL8s/maxresdefault.jpg",
          duration: 15,
          category: "wellbeing",
          featured: false,
          rating: 5,
          publishedAt: "2024-01-10"
        },
        {
          title: "Wisdom of Age",
          description: "Life lessons from centenarians around the world",
          youtubeId: "JGByzDMgYBc",
          thumbnail: "https://img.youtube.com/vi/JGByzDMgYBc/maxresdefault.jpg",
          duration: 12,
          category: "inspiration",
          featured: false,
          rating: 5,
          publishedAt: "2024-01-08"
        },
        {
          title: "Forest Bathing",
          description: "The healing power of nature immersion",
          youtubeId: "15ropOOmVJE",
          thumbnail: "https://img.youtube.com/vi/15ropOOmVJE/maxresdefault.jpg",
          duration: 19,
          category: "meditation",
          featured: false,
          rating: 4,
          publishedAt: "2024-01-05"
        },
        {
          title: "Seeds of Change",
          description: "Small daily habits that transform lives",
          youtubeId: "AdKUJxjn-R8",
          thumbnail: "https://img.youtube.com/vi/AdKUJxjn-R8/maxresdefault.jpg",
          duration: 16,
          category: "wellbeing",
          featured: false,
          rating: 5,
          publishedAt: "2024-01-03"
        },
        {
          title: "Unbreakable Bonds",
          description: "Stories of resilience through family connections",
          youtubeId: "WPni755-Krg",
          thumbnail: "https://img.youtube.com/vi/WPni755-Krg/maxresdefault.jpg",
          duration: 14,
          category: "inspiration",
          featured: false,
          rating: 5,
          publishedAt: "2024-01-01"
        },
        {
          title: "Mindful Kitchen",
          description: "Finding meditation through cooking",
          youtubeId: "nzKdFTEBUuo",
          thumbnail: "https://img.youtube.com/vi/nzKdFTEBUuo/maxresdefault.jpg",
          duration: 17,
          category: "mindfulness",
          featured: false,
          rating: 4,
          publishedAt: "2023-12-28"
        },
        {
          title: "Ripples of Kindness",
          description: "How small acts create lasting change",
          youtubeId: "O7VaXlMvAvk",
          thumbnail: "https://img.youtube.com/vi/O7VaXlMvAvk/maxresdefault.jpg",
          duration: 13,
          category: "inspiration",
          featured: false,
          rating: 5,
          publishedAt: "2023-12-25"
        },
        {
          title: "Dawn of Hope",
          description: "Stories of overcoming life's greatest challenges",
          youtubeId: "VrZ4sMRYimw",
          thumbnail: "https://img.youtube.com/vi/VrZ4sMRYimw/maxresdefault.jpg",
          duration: 18,
          category: "healing",
          featured: false,
          rating: 5,
          publishedAt: "2023-12-20"
        },
        {
          title: "Still Waters",
          description: "Finding calm in life's turbulent moments",
          youtubeId: "hHW1oY26kxQ",
          thumbnail: "https://img.youtube.com/vi/hHW1oY26kxQ/maxresdefault.jpg",
          duration: 11,
          category: "meditation",
          featured: false,
          rating: 4,
          publishedAt: "2023-12-15"
        }
      ];

      await db.insert(documentaries).values(seedData);
    } catch (error) {
      console.error('Error seeding documentaries:', error);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getDocumentaries(): Promise<Documentary[]> {
    return await db.select().from(documentaries).orderBy(desc(documentaries.publishedAt));
  }

  async getDocumentary(id: number): Promise<Documentary | undefined> {
    const [documentary] = await db.select().from(documentaries).where(eq(documentaries.id, id));
    return documentary || undefined;
  }

  async getDocumentariesByCategory(category: string): Promise<Documentary[]> {
    if (category === "all") {
      return this.getDocumentaries();
    }
    
    return await db.select()
      .from(documentaries)
      .where(eq(documentaries.category, category))
      .orderBy(desc(documentaries.publishedAt));
  }

  async getFeaturedDocumentary(): Promise<Documentary | undefined> {
    const [documentary] = await db.select()
      .from(documentaries)
      .where(eq(documentaries.featured, true));
    return documentary || undefined;
  }

  async searchDocumentaries(query: string): Promise<Documentary[]> {
    return await db.select()
      .from(documentaries)
      .where(
        or(
          ilike(documentaries.title, `%${query}%`),
          ilike(documentaries.description, `%${query}%`),
          ilike(documentaries.category, `%${query}%`)
        )
      )
      .orderBy(desc(documentaries.publishedAt));
  }

  async createDocumentary(insertDocumentary: InsertDocumentary): Promise<Documentary> {
    const [documentary] = await db
      .insert(documentaries)
      .values(insertDocumentary)
      .returning();
    return documentary;
  }

  async getCategories(): Promise<string[]> {
    const result = await db
      .selectDistinct({ category: documentaries.category })
      .from(documentaries);
    
    const categories = result.map((row: { category: string }) => row.category).sort();
    return ['all', ...categories];
  }
}

// Mock storage for development when no database is available
class MockStorage implements IStorage {
  private documentaries: Documentary[] = [
    {
      id: 1,
      title: "Finding Inner Peace",
      description: "A transformative 18-minute journey exploring mindfulness practices that have helped thousands find clarity and emotional balance in our chaotic world.",
      youtubeId: "inpok4MKVLM",
      thumbnail: "https://img.youtube.com/vi/inpok4MKVLM/maxresdefault.jpg",
      duration: 18,
      category: "mindfulness",
      featured: true,
      rating: 5,
      publishedAt: "2024-01-15",
      viewCount: 0,
      viewCountLastUpdated: null
    },
    {
      id: 2,
      title: "The Art of Breathing",
      description: "Ancient breathing techniques for modern stress relief",
      youtubeId: "YRPh_GaiL8s",
      thumbnail: "https://img.youtube.com/vi/YRPh_GaiL8s/maxresdefault.jpg",
      duration: 15,
      category: "wellbeing",
      featured: false,
      rating: 5,
      publishedAt: "2024-01-10",
      viewCount: 0,
      viewCountLastUpdated: null
    }
  ];

  private users: User[] = [];

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      id: this.users.length + 1,
      ...user
    };
    this.users.push(newUser);
    return newUser;
  }

  async getDocumentaries(): Promise<Documentary[]> {
    return [...this.documentaries].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  async getDocumentary(id: number): Promise<Documentary | undefined> {
    return this.documentaries.find(doc => doc.id === id);
  }

  async getDocumentariesByCategory(category: string): Promise<Documentary[]> {
    if (category === "all") {
      return this.getDocumentaries();
    }
    return this.documentaries.filter(doc => doc.category === category);
  }

  async getFeaturedDocumentary(): Promise<Documentary | undefined> {
    return this.documentaries.find(doc => doc.featured);
  }

  async searchDocumentaries(query: string): Promise<Documentary[]> {
    const lowerQuery = query.toLowerCase();
    return this.documentaries.filter(doc => 
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.description.toLowerCase().includes(lowerQuery) ||
      doc.category.toLowerCase().includes(lowerQuery)
    );
  }

  async createDocumentary(documentary: InsertDocumentary): Promise<Documentary> {
    const newDoc: Documentary = {
      id: this.documentaries.length + 1,
      viewCount: 0,
      viewCountLastUpdated: null,
      ...documentary,
      featured: documentary.featured ?? false,
      rating: documentary.rating ?? 5
    };
    this.documentaries.push(newDoc);
    return newDoc;
  }

  async getCategories(): Promise<string[]> {
    const categories = Array.from(new Set(this.documentaries.map(doc => doc.category))).sort();
    return ['all', ...categories];
  }
}

export const storage = db ? new DatabaseStorage() : new MockStorage();
