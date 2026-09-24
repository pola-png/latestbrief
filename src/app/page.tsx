import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BreakingTicker } from '@/components/BreakingTicker';
import { FeaturedHero } from '@/components/FeaturedHero';
import { CategoryFeed } from '@/components/CategoryFeed';
import { getAllArticles, getBreakingArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'LATEST BRIEF | Real-Time Global News & Intelligence',
  description: 'Fastest real-time news website delivering verified coverage on artificial intelligence, financial markets, space science, and climate technology.',
  openGraph: {
    title: 'LATEST BRIEF | Real-Time Global News & Intelligence',
    description: 'Fastest real-time news website delivering verified coverage on artificial intelligence, financial markets, space science, and climate technology.',
    url: 'https://latestbrief.com',
    siteName: 'LATEST BRIEF',
    images: [
      {
        url: 'https://latestbrief.com/images/tech_ai_cover.jpg',
        width: 1200,
        height: 675,
        alt: 'LATEST BRIEF Newsroom',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LATEST BRIEF | Real-Time Global News',
    description: 'Fastest real-time news website delivering verified coverage.',
    images: ['https://latestbrief.com/images/tech_ai_cover.jpg'],
  },
};

export default function HomePage() {
  const articles = getAllArticles();
  const breakingArticles = getBreakingArticles();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Header />
      <BreakingTicker articles={breakingArticles.length > 0 ? breakingArticles : articles} />

      <main className="flex-1">
        <FeaturedHero articles={articles} />
        <CategoryFeed initialArticles={articles} />
      </main>

      <Footer />
    </div>
  );
}
