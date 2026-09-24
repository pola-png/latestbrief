import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticleCard } from '@/components/ArticleCard';
import { getArticlesByCategory, getAllArticles } from '@/lib/articles';
import { CategoryType } from '@/types/article';
import { Layers, ArrowLeft, TrendingUp } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_MAP: Record<string, CategoryType> = {
  'world': 'World',
  'tech-ai': 'Tech & AI',
  'markets-economy': 'Markets & Economy',
  'science-space': 'Science & Space',
  'climate-energy': 'Climate & Energy',
  'culture-society': 'Culture & Society'
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = CATEGORY_MAP[slug];

  if (!categoryName) {
    return { title: 'Category Not Found | LATEST BRIEF' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://latestbrief.com';
  const url = `${siteUrl}/category/${slug}`;

  return {
    title: `${categoryName} News & Intel | LATEST BRIEF`,
    description: `Real-time updates, analytical reports, and ground coverage on ${categoryName}. Verified global news intelligence.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${categoryName} Coverage | LATEST BRIEF`,
      description: `Latest global developments, breaking stories, and editorial briefings on ${categoryName}.`,
      url,
      siteName: 'LATEST BRIEF',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} Coverage | LATEST BRIEF`,
      description: `Latest global updates on ${categoryName}.`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryName = CATEGORY_MAP[slug];

  if (!categoryName) {
    notFound();
  }

  const articles = getArticlesByCategory(categoryName);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-10 w-full">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Home / Categories
          </Link>
        </div>

        {/* Category Header Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/30 border border-slate-800 mb-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <span className="inline-flex items-center px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-widest rounded-md">
              <Layers className="w-3.5 h-3.5 mr-1.5" />
              Category Portal
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
              {categoryName}
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Comprehensive news coverage, analytical dispatches, and real-time updates curated for {categoryName}.
            </p>
            <div className="text-xs text-slate-400 pt-2 flex items-center space-x-2">
              <span className="font-bold text-amber-400">{articles.length}</span>
              <span>Publications in this section</span>
            </div>
          </div>
        </div>

        {/* Category Feed Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No articles published under this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
