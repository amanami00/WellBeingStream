export interface Documentary {
  id: number;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  duration?: number;
  thumbnailUrl?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}