'use client';

import React, { useState } from 'react';
import { Share2, Globe, Send, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== 'undefined' ? window.location.href : url;

  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
      '_blank'
    );
  };

  const shareLinkedin = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
      '_blank'
    );
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">
        Share:
      </span>
      <button
        onClick={shareX}
        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-colors flex items-center space-x-1"
        title="Share on X / Twitter"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Share X</span>
      </button>
      <button
        onClick={shareLinkedin}
        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-blue-400 hover:border-blue-500/30 transition-colors flex items-center space-x-1"
        title="Share on LinkedIn"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>LinkedIn</span>
      </button>
      <button
        onClick={copyToClipboard}
        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors flex items-center space-x-1.5"
        title="Copy URL Link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Link Copied</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
