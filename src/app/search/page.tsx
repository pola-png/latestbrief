'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticleCard } from '@/components/ArticleCard';
import { Article } from '@/types/article';
import { Search, Flame, ArrowLeft, Filter } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const isTrendingFilter = searchParams.get('trending') === 'true';

  const [query, setQuery] = useState(initialQuery);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSearch() {
      setLoading(true);
      try {
        let url = '/api/articles';
        if (query) {
          url += `?search=${encodeURIComponent(query)}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          let list: Article[] = data.articles;
          if (isTrendingFilter) {
            list = [...list].sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0));
          }
          setArticles(list);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchSearch();
  }, [query, isTrendingFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-8">
      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="relative max-w-3xl">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search quantum computing, inflation rates, exoplanet water, wind grid..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 text-sm text-white rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-amber-400 shadow-xl"
        />
      </form>

      {/* Suggested Search Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Hot Topics:</span>
        {['Quantum Computing', 'Inflation', 'Exoplanet', 'Wind Power', 'Markets', 'AI'].map((topic) => (
          <button
            key={topic}
            onClick={() => setQuery(topic)}
            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 rounded-lg transition-colors"
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Results Section */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <h2 className="text-lg font-bold text-white flex items-center">
            {isTrendingFilter ? (
              <>
                <Flame className="w-5 h-5 text-orange-500 mr-2" />
                Trending Intelligence Dispatches
              </>
            ) : query ? (
              `Search Results for "${query}"`
            ) : (
              'All Global Publications'
            )}
          </h2>
          <span className="text-xs text-slate-400">{articles.length} stories found</span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400">Searching global news database...</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
            <Search className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No stories match "{query}"</h3>
            <p className="text-xs text-slate-400">Try adjusting your keyword or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
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

        <Suspense fallback={<div className="text-slate-400 text-xs">Loading search...</div>}>
          <SearchContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
