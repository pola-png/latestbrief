'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Eye, ThumbsUp, Flame, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Article } from '@/types/article';
import { ArticleCard } from './ArticleCard';
import { ImageWithFallback } from './ImageWithFallback';

interface FeaturedHeroProps {
  articles: Article[];
}

export function FeaturedHero({ articles }: FeaturedHeroProps) {
  if (!articles || articles.length === 0) return null;

  const mainArticle = articles[0];
  const secondaryArticles = articles.slice(1, 3);

  const mainDate = new Date(mainArticle.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Featured Article (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between group">
          <div className="relative w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            <ImageWithFallback
              src={mainArticle.image}
              fallbackSrc="/images/tech_ai_cover.jpg"
              alt={mainArticle.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

            <div className="absolute top-4 left-4 flex space-x-2">
              <span className="bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider px-3 py-1 rounded shadow-lg">
                FEATURED STORY
              </span>
              <span className="bg-slate-900/80 backdrop-blur-md text-amber-400 font-bold text-xs uppercase tracking-wider px-3 py-1 rounded border border-amber-500/30">
                {mainArticle.category}
              </span>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 space-y-3">
              <div className="flex items-center space-x-3 text-xs text-slate-300">
                <span className="font-semibold text-white">{mainArticle.author.name}</span>
                <span>•</span>
                <span>{mainDate}</span>
                <span>•</span>
                <span className="flex items-center text-amber-400">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {mainArticle.readTime} min read
                </span>
              </div>

              <Link href={`/article/${mainArticle.slug}`}>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white group-hover:text-amber-400 transition-colors leading-tight">
                  {mainArticle.title}
                </h1>
              </Link>

              <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                {mainArticle.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-slate-700/50 text-xs text-slate-400">
                <Link
                  href={`/article/${mainArticle.slug}`}
                  className="inline-flex items-center text-amber-400 font-bold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Full Coverage</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>

                <div className="flex items-center space-x-4">
                  <span className="flex items-center"><Eye className="w-3.5 h-3.5 mr-1" />{mainArticle.views.toLocaleString()}</span>
                  <span className="flex items-center"><ThumbsUp className="w-3.5 h-3.5 mr-1 text-amber-400" />{mainArticle.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Stack (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
              <Flame className="w-4 h-4 text-orange-500 mr-2" />
              Trending & Editors' Picks
            </h2>
            <Link href="/search?trending=true" className="text-xs text-amber-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {secondaryArticles.map((art) => (
              <ArticleCard key={art.id} article={art} variant="compact" />
            ))}
          </div>

          {/* Quick Takeaways Box */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1.5 fill-amber-400" />
              Key Intelligence Takeaways
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {mainArticle.keyTakeaways ? (
                mainArticle.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Real-time coverage verified across international news bureaus.</span>
                </li>
              )}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
