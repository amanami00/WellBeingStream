import { users, documentaries, type User, type InsertUser, type Documentary, type InsertDocumentary } from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private documentaries: Map<number, Documentary>;
  private currentUserId: number;
  private currentDocumentaryId: number;

  constructor() {
    this.users = new Map();
    this.documentaries = new Map();
    this.currentUserId = 1;
    this.currentDocumentaryId = 1;
    this.seedDocumentaries();
  }

  private seedDocumentaries() {
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

    seedData.forEach(doc => {
      this.createDocumentary(doc);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDocumentaries(): Promise<Documentary[]> {
    return Array.from(this.documentaries.values()).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getDocumentary(id: number): Promise<Documentary | undefined> {
    return this.documentaries.get(id);
  }

  async getDocumentariesByCategory(category: string): Promise<Documentary[]> {
    if (category === "all") {
      return this.getDocumentaries();
    }
    
    return Array.from(this.documentaries.values())
      .filter(doc => doc.category === category)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getFeaturedDocumentary(): Promise<Documentary | undefined> {
    return Array.from(this.documentaries.values()).find(doc => doc.featured);
  }

  async searchDocumentaries(query: string): Promise<Documentary[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.documentaries.values())
      .filter(doc => 
        doc.title.toLowerCase().includes(lowercaseQuery) ||
        doc.description.toLowerCase().includes(lowercaseQuery) ||
        doc.category.toLowerCase().includes(lowercaseQuery)
      )
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async createDocumentary(insertDocumentary: InsertDocumentary): Promise<Documentary> {
    const id = this.currentDocumentaryId++;
    const documentary: Documentary = { ...insertDocumentary, id };
    this.documentaries.set(id, documentary);
    return documentary;
  }
}

export const storage = new MemStorage();
