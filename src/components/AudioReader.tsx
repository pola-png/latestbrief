'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';

interface AudioReaderProps {
  title: string;
  content: string;
}

export function AudioReader({ title, content }: AudioReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      // Clean up text
      const cleanText = `${title}. ${content.replace(/<[^>]*>?/gm, '').replace(/[#*>`]/g, '')}`;
      const synthText = new SpeechSynthesisUtterance(cleanText);
      synthText.rate = 1.0;
      synthText.onend = () => setIsPlaying(false);
      synthText.onerror = () => setIsPlaying(false);
      setUtterance(synthText);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [title, content]);

  const togglePlay = () => {
    if (!isSupported || !utterance) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="flex items-center space-x-3 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl">
      <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
        <Volume2 className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="block text-xs font-bold text-white uppercase tracking-wider">
          Audio Listener (TTS)
        </span>
        <span className="block text-[11px] text-slate-400 truncate">
          {isPlaying ? 'Playing article narration...' : 'Listen to full article audio'}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={togglePlay}
          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-1"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-slate-950" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Listen</span>
            </>
          )}
        </button>
        {isPlaying && (
          <button
            onClick={handleStop}
            className="p-1.5 text-slate-400 hover:text-white"
            title="Stop Audio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
