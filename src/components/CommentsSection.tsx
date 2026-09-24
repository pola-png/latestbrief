'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, CheckCircle2 } from 'lucide-react';
import { Comment } from '@/types/article';

interface CommentsSectionProps {
  articleId: string;
  initialComments?: Comment[];
}

export function CommentsSection({ articleId, initialComments = [] }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`comments_${articleId}`);
      if (stored) {
        const localComments: Comment[] = JSON.parse(stored);
        setComments([...initialComments, ...localComments]);
      }
    }
  }, [articleId, initialComments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    setIsSubmitting(true);

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: authorName.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString()
    };

    const updated = [newComment, ...comments];
    setComments(updated);

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`comments_${articleId}`);
      const localList: Comment[] = stored ? JSON.parse(stored) : [];
      localStorage.setItem(`comments_${articleId}`, JSON.stringify([newComment, ...localList]));
    }

    setContent('');
    setIsSubmitting(false);
  };

  return (
    <div className="pt-10 border-t border-slate-800 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-serif text-white flex items-center">
          <MessageSquare className="w-5 h-5 text-amber-400 mr-2" />
          Reader Discussion ({comments.length})
        </h3>
        <span className="text-xs text-slate-400">Moderated Editorial Forum</span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Join the Conversation
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1 font-medium">Your Name / Handle</label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Alex Morgan"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1 font-medium">Comment / Perspective</label>
          <textarea
            required
            rows={3}
            placeholder="Share your perspective or query on this briefing..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-3 focus:outline-none focus:border-amber-400"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Comment</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Be the first to join the discussion on this article.</p>
        ) : (
          comments.map((c) => {
            const dateStr = new Date(c.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
            return (
              <div key={c.id} className="p-4 bg-slate-900/40 border border-slate-800/60 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-white">{c.author}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{dateStr}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-9">
                  {c.content}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
