'use client';

import React, { useState } from 'react';
import { Article, CategoryType } from '@/types/article';
import { ArticleCard } from './ArticleCard';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

interface CategoryFeedProps {
  initialArticles: Article[];
}

const CATEGORIES: (CategoryType | 'All')[] = [
  'All',
  'World',
  'Tech & AI',
  'Markets & Economy',
  'Science & Space',
  'Climate & Energy',
  'Culture & Society'
];

export function CategoryFeed({ initialArticles }: CategoryFeedProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'All'>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'trending' | 'popular'>('latest');

  let filtered = activeCategory === 'All' 
    ? initialArticles 
    : initialArticles.filter(art => art.category === activeCategory);

  if (sortBy === 'trending') {
    filtered = [...filtered].sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0));
  } else if (sortBy === 'popular') {
    filtered = [...filtered].sort((a, b) => b.views - a.views);
  } else {
    filtered = [...filtered].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      {/* Feed Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
        <div>
          <h2 className="text-xl font-bold font-serif text-white flex items-center">
            <Sparkles className="w-5 h-5 text-amber-400 mr-2" />
            Latest Publications & Wire
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time coverage compiled across international bureaus
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-400"
          >
            <option value="latest">Latest First</option>
            <option value="trending">Trending Score</option>
            <option value="popular">Most Viewed</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 no-scrollbar mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400">No publications found under this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      )}
    </section>
  );
}
