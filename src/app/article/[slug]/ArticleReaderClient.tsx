'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/types/article';
import { ThumbsUp, Type, ExternalLink } from 'lucide-react';

interface ArticleReaderClientProps {
  article: Article;
}

export default function ArticleReaderClient({ article }: ArticleReaderClientProps) {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [likes, setLikes] = useState(article.likes);
  const [hasLiked, setHasLiked] = useState(false);

  const fontClasses = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-relaxed',
    xlarge: 'text-xl leading-relaxed',
  };

  const handleLike = async () => {
    if (hasLiked) return;
    setLikes(prev => prev + 1);
    setHasLiked(true);

    try {
      await fetch(`/api/articles/${article.id}/like`, { method: 'POST' });
    } catch (e) {
      console.error('Like error:', e);
    }
  };

  // Helper to parse markdown links [text](url) into React elements
  const parseParagraphWithLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const linkText = match[1];
      const linkUrl = match[2];

      if (linkUrl.startsWith('/')) {
        parts.push(
          <Link
            key={match.index}
            href={linkUrl}
            className="text-amber-400 font-semibold hover:underline bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 inline-flex items-center space-x-1"
          >
            <span>{linkText}</span>
          </Link>
        );
      } else {
        parts.push(
          <a
            key={match.index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 font-semibold hover:underline inline-flex items-center"
          >
            <span>{linkText}</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        );
      }
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const paragraphs = article.content.split('\n\n');

  return (
    <div className="space-y-6">
      {/* Reader Controls Toolbar */}
      <div className="flex items-center justify-between py-2.5 px-4 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <Type className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-300">Text Size:</span>
          <button
            onClick={() => setFontSize('normal')}
            className={`px-2 py-1 rounded ${fontSize === 'normal' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            A
          </button>
          <button
            onClick={() => setFontSize('large')}
            className={`px-2 py-1 rounded text-sm ${fontSize === 'large' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            A+
          </button>
          <button
            onClick={() => setFontSize('xlarge')}
            className={`px-2 py-1 rounded text-base ${fontSize === 'xlarge' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            A++
          </button>
        </div>

        <button
          onClick={handleLike}
          disabled={hasLiked}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            hasLiked
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
          }`}
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-emerald-400' : 'fill-slate-950'}`} />
          <span>{hasLiked ? 'Liked' : 'Like Article'} ({likes})</span>
        </button>
      </div>

      {/* Formatted Content */}
      <div className={`prose prose-invert max-w-none text-slate-200 font-serif ${fontClasses[fontSize]}`}>
        {paragraphs.map((p, idx) => {
          const trimmed = p.trim();
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-2xl font-bold font-serif text-white mt-8 mb-4 border-b border-slate-800 pb-2">
                {trimmed.replace('### ', '')}
              </h3>
            );
          }
          if (trimmed.startsWith('> ')) {
            return (
              <blockquote key={idx} className="p-4 my-6 bg-slate-900 border-l-4 border-amber-400 rounded-r-lg italic text-slate-200 font-sans">
                {parseParagraphWithLinks(trimmed.replace('> ', ''))}
              </blockquote>
            );
          }
          if (trimmed.startsWith('* ')) {
            return (
              <ul key={idx} className="list-disc pl-5 space-y-1 text-slate-300 my-4">
                {trimmed.split('\n').map((li, i) => (
                  <li key={i}>{parseParagraphWithLinks(li.replace('* ', ''))}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="mb-5 leading-relaxed">
              {parseParagraphWithLinks(trimmed)}
            </p>
          );
        })}
      </div>
    </div>
  );
}
