'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye, ThumbsUp, Flame, ArrowUpRight } from 'lucide-react';
import { Article } from '@/types/article';
import { BookmarkButton } from './BookmarkButton';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured' | 'horizontal';
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  if (variant === 'compact') {
    return (
      <div className="group flex items-start space-x-4 py-3 border-b border-slate-800/60 last:border-0 hover:bg-slate-800/20 px-2 rounded-lg transition-colors">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-800">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="80px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1">
            <span>{article.category}</span>
            <span>•</span>
            <span className="text-slate-400 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {article.readTime} min
            </span>
          </div>
          <Link href={`/article/${article.slug}`}>
            <h4 className="text-xs font-semibold text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h4>
          </Link>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center space-x-3">
            <span>{publishedDate}</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className="group grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all shadow-md">
        <div className="relative h-48 md:h-full rounded-lg overflow-hidden bg-slate-800">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {article.isBreaking && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded shadow-md">
              BREAKING
            </span>
          )}
        </div>
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase tracking-wider mb-2">
              <span className="bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                {article.category}
              </span>
              <div className="flex items-center space-x-3 text-slate-400 font-normal">
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {article.readTime} min read
                </span>
                <BookmarkButton article={article} />
              </div>
            </div>
            <Link href={`/article/${article.slug}`}>
              <h3 className="text-xl font-bold font-serif text-white group-hover:text-amber-400 transition-colors leading-snug mb-2 flex items-start justify-between">
                <span>{article.title}</span>
                <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0 ml-2" />
              </h3>
            </Link>
            <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4">
              {article.excerpt}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/60">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-slate-300">{article.author.name}</span>
              <span>•</span>
              <span>{publishedDate}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center"><Eye className="w-3.5 h-3.5 mr-1" />{article.views.toLocaleString()}</span>
              <span className="flex items-center"><ThumbsUp className="w-3.5 h-3.5 mr-1 text-amber-400" />{article.likes}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col justify-between rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 transition-all shadow-md overflow-hidden h-full">
      <div>
        <div className="relative w-full h-48 bg-slate-800 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex space-x-2">
            <span className="bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-amber-500/30">
              {article.category}
            </span>
            {article.isBreaking && (
              <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded shadow-md">
                BREAKING
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <BookmarkButton article={article} />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center space-x-3 text-xs text-slate-400 mb-2">
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
              {article.readTime} min read
            </span>
            <span>•</span>
            <span>{publishedDate}</span>
          </div>

          <Link href={`/article/${article.slug}`}>
            <h3 className="text-lg font-bold font-serif text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug mb-2">
              {article.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span className="font-medium text-slate-300 truncate max-w-[140px]">
          {article.author.name}
        </span>
        <div className="flex items-center space-x-3">
          <span className="flex items-center"><Eye className="w-3.5 h-3.5 mr-1 text-slate-400" />{article.views}</span>
          <span className="flex items-center"><ThumbsUp className="w-3.5 h-3.5 mr-1 text-amber-400" />{article.likes}</span>
        </div>
      </div>
    </div>
  );
}
