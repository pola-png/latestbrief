'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ChevronRight } from 'lucide-react';
import { Article } from '@/types/article';

interface BreakingTickerProps {
  articles: Article[];
}

export function BreakingTicker({ articles }: BreakingTickerProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="w-full bg-amber-500 text-slate-950 font-sans border-b border-amber-600 overflow-hidden shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center px-4 sm:px-8 py-2">
        {/* Badge */}
        <div className="flex items-center space-x-1.5 px-3 py-1 bg-slate-950 text-amber-400 font-bold text-[11px] uppercase tracking-widest rounded-md shrink-0 mr-4 shadow-sm">
          <Zap className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
          <span>BREAKING</span>
        </div>

        {/* Scrolling text marquee */}
        <div className="flex-1 overflow-hidden relative">
          <div className="flex items-center space-x-8 animate-marquee whitespace-nowrap">
            {articles.map((art) => (
              <Link
                key={art.id}
                href={`/article/${art.slug}`}
                className="inline-flex items-center space-x-2 text-xs font-semibold hover:underline text-slate-950 group"
              >
                <span className="font-bold text-slate-900 border-b border-slate-900/40 pb-0.5">[{art.category}]</span>
                <span>{art.title}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
