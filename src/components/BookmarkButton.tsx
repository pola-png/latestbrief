'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { Article } from '@/types/article';

interface BookmarkButtonProps {
  article: Article;
}

export function BookmarkButton({ article }: BookmarkButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saved_articles');
      if (saved) {
        const list: Article[] = JSON.parse(saved);
        setIsSaved(list.some(item => item.id === article.id));
      }
    }
  }, [article.id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saved_articles');
      let list: Article[] = saved ? JSON.parse(saved) : [];

      if (isSaved) {
        list = list.filter(item => item.id !== article.id);
        setIsSaved(false);
      } else {
        list.push(article);
        setIsSaved(true);
      }

      localStorage.setItem('saved_articles', JSON.stringify(list));
    }
  };

  return (
    <button
      onClick={toggleSave}
      className={`p-1.5 rounded-full transition-all backdrop-blur-md ${
        isSaved 
          ? 'bg-amber-500 text-slate-950 shadow-md' 
          : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-700/50'
      }`}
      title={isSaved ? 'Remove from saved reading list' : 'Save article for later'}
    >
      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-slate-950' : ''}`} />
    </button>
  );
}
