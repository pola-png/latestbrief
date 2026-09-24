import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Editorial Policy & Fact-Checking | LATEST BRIEF',
  description: 'Editorial guidelines, verification procedures, fact-checking policies, and correction standards at LATEST BRIEF.',
  alternates: { canonical: 'https://latestbrief.com/ethics' },
};

export default function EthicsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-12 w-full space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Top Headlines
          </Link>
        </div>

        <div className="space-y-4 border-b border-slate-800 pb-8">
          <span className="inline-flex items-center px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest rounded-md">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
            Journalistic Standards
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            Editorial Guidelines & Fact-Checking Policy
          </h1>
          <p className="text-sm text-slate-300 font-serif leading-relaxed">
            Our commitment to absolute accuracy, independence, transparent sourcing, and prompt correction of errors.
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-6">
          <h2 className="text-xl font-bold font-serif text-white pt-2 border-b border-slate-800 pb-2">1. Fact-Checking Standard</h2>
          <p>
            Every story published on LATEST BRIEF undergoes a multi-stage verification process. Writers must cross-reference core statements against primary sources, academic literature, or accredited regulatory filings before submission to section editors.
          </p>

          <h2 className="text-xl font-bold font-serif text-white pt-4 border-b border-slate-800 pb-2">2. Independence & Conflicts of Interest</h2>
          <p>
            LATEST BRIEF maintains absolute editorial independence. Advertisers and sponsors have zero influence over editorial selection, headline phrasing, or research conclusions. Staff writers are required to disclose potential conflicts of interest.
          </p>

          <h2 className="text-xl font-bold font-serif text-white pt-4 border-b border-slate-800 pb-2">3. Transparent Correction Policy</h2>
          <p>
            When factual errors or typographical mistakes occur, we correct them promptly and transparently. Substantive corrections are accompanied by an explicit editor's note detailing what was changed and when. Readers can submit correction requests to <strong>corrections@latestbrief.com</strong>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
