'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Search, 
  Bookmark, 
  Rss, 
  Sun, 
  Moon,
  Menu,
  X,
  Flame,
  Zap,
  TrendingUp
} from 'lucide-react';
import { CategoryType } from '@/types/article';

const CATEGORIES: CategoryType[] = [
  'World',
  'Tech & AI',
  'Markets & Economy',
  'Science & Space',
  'Climate & Energy',
  'Culture & Society'
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));
    
    if (typeof window !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark') || 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
      if (isDark) document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="w-full bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      {/* Top Utility Bar */}
      <div className="bg-slate-950 text-slate-400 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800/60">
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-emerald-400 font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-2 inline-block"></span>
            LIVE INTELLIGENCE
          </span>
          <span className="hidden sm:inline border-l border-slate-800 pl-4 text-slate-400">
            {currentDate}
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link 
            href="/rss.xml" 
            target="_blank" 
            className="flex items-center hover:text-amber-400 transition-colors"
            title="RSS Feed"
          >
            <Rss className="w-3.5 h-3.5 mr-1" />
            <span className="hidden sm:inline">RSS Feed</span>
          </Link>
          <Link 
            href="/bookmarks" 
            className="flex items-center hover:text-amber-400 transition-colors"
            title="Saved Reading List"
          >
            <Bookmark className="w-3.5 h-3.5 mr-1 text-amber-400" />
            <span className="hidden sm:inline">Saved Articles</span>
          </Link>
          <button 
            onClick={toggleDarkMode} 
            className="p-1 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Brand & Actions Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 via-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold tracking-tight font-serif text-white group-hover:text-amber-400 transition-colors">
                LATEST<span className="text-amber-400">BRIEF</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans uppercase tracking-widest font-semibold">
              Real-Time Global News & Intelligence
            </p>
          </div>
        </Link>

        {/* Right Actions: Search & Trending Shortcut */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all flex items-center space-x-2 border border-slate-700/50"
            title="Search Articles"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="hidden md:inline text-xs text-slate-300 font-medium pr-1">Search</span>
          </button>

          <Link
            href="/search?trending=true"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 font-semibold text-xs tracking-wide uppercase border border-orange-500/30 transition-all shadow-md"
          >
            <Flame className="w-4 h-4" />
            <span className="hidden sm:inline">Trending Intel</span>
          </Link>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <nav className="bg-slate-950/80 backdrop-blur-md border-t border-slate-800 hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex space-x-1 py-1">
            <Link
              href="/"
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors rounded-md ${
                pathname === '/' 
                  ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-400' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Top Stories
            </Link>

            {CATEGORIES.map((cat) => {
              const slug = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
              const href = `/category/${slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={cat}
                  href={href}
                  className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors rounded-md whitespace-nowrap ${
                    isActive 
                      ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-400' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Expandable Search Input Bar */}
      {isSearchOpen && (
        <div className="bg-slate-950 border-t border-slate-800 py-3 px-4 sm:px-8 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="max-w-4xl mx-auto flex items-center space-x-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search quantum computing, market trends, space discoveries, climate technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-4 py-4 space-y-2 animate-fadeIn">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800"
          >
            Top Stories
          </Link>
          {CATEGORIES.map((cat) => {
            const slug = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
            return (
              <Link
                key={cat}
                href={`/category/${slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-amber-400"
              >
                {cat}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
