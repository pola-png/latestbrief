'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticleCard } from '@/components/ArticleCard';
import { Article } from '@/types/article';
import { Bookmark, ArrowLeft, Trash2 } from 'lucide-react';

export default function BookmarksPage() {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saved_articles');
      if (saved) {
        setSavedArticles(JSON.parse(saved));
      }
      setIsLoaded(true);
    }
  }, []);

  const clearAll = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('saved_articles');
      setSavedArticles([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-10 w-full">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Home
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <span className="inline-flex items-center px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider rounded-md mb-2">
              <Bookmark className="w-3.5 h-3.5 mr-1.5 fill-amber-400" />
              Personal Library
            </span>
            <h1 className="text-3xl font-extrabold font-serif text-white">
              Saved Reading List
            </h1>
          </div>

          {savedArticles.length > 0 && (
            <button
              onClick={clearAll}
              className="inline-flex items-center text-xs font-semibold text-red-400 hover:text-red-300 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              Clear Saved Articles
            </button>
          )}
        </div>

        {!isLoaded ? (
          <div className="py-20 text-center text-xs text-slate-400">Loading saved library...</div>
        ) : savedArticles.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-4">
            <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white font-serif">Your Reading List is Empty</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Save stories as you browse by clicking the bookmark icon on any article card or reader header.
            </p>
            <Link
              href="/"
              className="inline-block px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
            >
              Browse Top Headlines
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
