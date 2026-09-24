import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gotperfects.online';
  const articles = getAllArticles();

  // Static core routes with maximum SEO priority
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/ethics`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/bookmarks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.80,
    },
  ];

  // Category pages (priority 0.95)
  const categories = ['World', 'Tech & AI', 'Markets & Economy', 'Science & Space', 'Climate & Energy', 'Culture & Society'];
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${encodeURIComponent(cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'))}`,
    lastModified: new Date(),
    changeFrequency: 'hourly',
    priority: 0.95,
  }));

  // Article pages (priority 0.90)
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: 'daily',
    priority: 0.90,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
