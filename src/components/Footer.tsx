'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, Mail, Rss, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CategoryType } from '@/types/article';

const CATEGORIES: CategoryType[] = [
  'World',
  'Tech & AI',
  'Markets & Economy',
  'Science & Space',
  'Climate & Energy',
  'Culture & Society'
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-gradient-to-tr from-amber-500 via-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Zap className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-extrabold font-serif text-white">
                LATEST<span className="text-amber-400">BRIEF</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              LATEST BRIEF is an independent news network delivering high-speed, factual journalism and strategic intelligence across artificial intelligence, global finance, deep space science, and climate innovation.
            </p>
            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Independent Editorial Integrity • Verified Global Sources</span>
            </div>
          </div>

          {/* Quick Category Sitemap */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((cat) => {
                const slug = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                return (
                  <li key={cat}>
                    <Link 
                      href={`/category/${slug}`}
                      className="hover:text-amber-400 transition-colors"
                    >
                      {cat}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Direct Portals */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Top Headlines</Link></li>
              <li><Link href="/search?trending=true" className="hover:text-amber-400 transition-colors">Trending Intelligence</Link></li>
              <li><Link href="/search" className="hover:text-amber-400 transition-colors">Search Archive</Link></li>
              <li><Link href="/bookmarks" className="hover:text-amber-400 transition-colors">Saved Reading List</Link></li>
              <li><Link href="/rss.xml" target="_blank" className="hover:text-amber-400 transition-colors flex items-center"><Rss className="w-3.5 h-3.5 mr-1" /> RSS Feed</Link></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-amber-400 pl-2">
              Daily Intelligence Brief
            </h3>
            <p className="text-xs text-slate-400">
              Get the morning intelligence summary delivered straight to your inbox every day.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
                <span>Subscribed! You are now on the briefing list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Subscribe Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} LATEST BRIEF News Network. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms of Service</Link>
            <Link href="/ethics" className="hover:text-slate-300">Editorial Guidelines</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
