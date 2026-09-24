'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, Check, X } from 'lucide-react';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookie_consent_accepted');
      if (!consent) {
        setShowBanner(true);
      }
    }
  }, []);

  const acceptCookies = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie_consent_accepted', 'true');
      setShowBanner(false);
    }
  };

  const declineCookies = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie_consent_accepted', 'essential_only');
      setShowBanner(false);
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl animate-fadeIn">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5 max-w-3xl">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs text-slate-300">
            <span className="block font-bold text-white text-sm">
              We Value Your Privacy & Data Choice
            </span>
            <p className="leading-relaxed">
              We use cookies and third-party advertising partners (including Google AdSense) to personalize content, deliver relevant advertisements, analyze web traffic, and enhance user experience. Learn more in our{' '}
              <Link href="/privacy" className="text-amber-400 font-semibold underline hover:text-amber-300">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/ethics" className="text-amber-400 font-semibold underline hover:text-amber-300">
                Editorial Guidelines
              </Link>.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={declineCookies}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors border border-slate-700"
          >
            Essential Only
          </button>
          <button
            onClick={acceptCookies}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center space-x-1.5"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Accept All Cookies</span>
          </button>
        </div>
      </div>
    </div>
  );
}
