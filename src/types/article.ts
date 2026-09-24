export type CategoryType = 
  | 'World' 
  | 'Tech & AI' 
  | 'Markets & Economy' 
  | 'Science & Space' 
  | 'Climate & Energy' 
  | 'Culture & Society';

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string; // Markdown/HTML body
  category: CategoryType;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readTime: number; // in minutes
  views: number;
  likes: number;
  image: string;
  imageCaption: string;
  tags: string[];
  isFeatured?: boolean;
  isBreaking?: boolean;
  trendingScore?: number;
  keyTakeaways?: string[];
  comments?: Comment[];
}
