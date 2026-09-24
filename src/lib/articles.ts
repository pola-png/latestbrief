import fs from 'fs';
import path from 'path';
import { Article, CategoryType } from '@/types/article';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'articles.json');

// Helper to read articles from local JSON store
export function getStoredArticles(): Article[] {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const articles: Article[] = JSON.parse(fileData);
    // Sort by publishedAt descending
    return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (error) {
    console.error('Error reading articles JSON:', error);
    return [];
  }
}

// Helper to write articles back to JSON file (for live production publishing)
export function saveStoredArticles(articles: Article[]): boolean {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(articles, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving articles JSON:', error);
    return false;
  }
}

export function getAllArticles(): Article[] {
  return getStoredArticles();
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getStoredArticles();
  return articles.find(art => art.slug === slug) || null;
}

export function getArticlesByCategory(category: CategoryType | 'All'): Article[] {
  const articles = getStoredArticles();
  if (category === 'All') return articles;
  return articles.filter(art => art.category === category);
}

export function getFeaturedArticles(): Article[] {
  const articles = getStoredArticles();
  return articles.filter(art => art.isFeatured);
}

export function getBreakingArticles(): Article[] {
  const articles = getStoredArticles();
  return articles.filter(art => art.isBreaking);
}

export function getTrendingArticles(limit: number = 5): Article[] {
  const articles = getStoredArticles();
  return [...articles].sort((a, b) => (b.trendingScore || b.views) - (a.trendingScore || a.views)).slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const articles = getStoredArticles();
  if (!query || query.trim() === '') return articles;
  const q = query.toLowerCase().trim();
  return articles.filter(art => 
    art.title.toLowerCase().includes(q) ||
    art.subtitle.toLowerCase().includes(q) ||
    art.excerpt.toLowerCase().includes(q) ||
    art.category.toLowerCase().includes(q) ||
    art.tags.some(tag => tag.toLowerCase().includes(q))
  );
}

export function createArticle(newArticleData: Omit<Article, 'id' | 'publishedAt' | 'views' | 'likes'>): Article {
  const articles = getStoredArticles();
  
  const id = `art-${Date.now().toString(36)}`;
  const publishedAt = new Date().toISOString();
  
  const newArticle: Article = {
    ...newArticleData,
    id,
    publishedAt,
    views: 1,
    likes: 0,
    trendingScore: 80,
  };

  const updatedList = [newArticle, ...articles];
  saveStoredArticles(updatedList);
  return newArticle;
}

export function likeArticle(id: string): { success: boolean; likes: number } {
  const articles = getStoredArticles();
  const index = articles.findIndex(a => a.id === id);
  if (index === -1) return { success: false, likes: 0 };
  
  articles[index].likes += 1;
  saveStoredArticles(articles);
  return { success: true, likes: articles[index].likes };
}
