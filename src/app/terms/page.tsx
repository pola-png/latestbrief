import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileText, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | LATEST BRIEF News Network',
  description: 'Terms of service, intellectual property guidelines, and user agreement for LATEST BRIEF.',
  alternates: { canonical: 'https://latestbrief.com/terms' },
};

export default function TermsPage() {
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
            <FileText className="w-3.5 h-3.5 mr-1.5" />
            User Agreement
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: September 24, 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-6">
          <h2 className="text-xl font-bold font-serif text-white pt-2 border-b border-slate-800 pb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and using <strong>LATEST BRIEF</strong> (https://latestbrief.com), you agree to comply with and be bound by these Terms of Service. If you do not agree, please discontinue use of the website immediately.
          </p>

          <h2 className="text-xl font-bold font-serif text-white pt-4 border-b border-slate-800 pb-2">2. Intellectual Property Rights</h2>
          <p>
            All original editorial content, articles, research summaries, images, layout designs, and logos published on LATEST BRIEF are the intellectual property of LATEST BRIEF unless otherwise noted. Unauthorized copying, scraping, or automated redistribution without express attribution is prohibited.
          </p>

          <h2 className="text-xl font-bold font-serif text-white pt-4 border-b border-slate-800 pb-2">3. Accuracy of Information & Disclaimer</h2>
          <p>
            While our newsroom employs strict verification procedures, news coverage and macroeconomic reports are provided for informational and educational purposes only. Financial, medical, or technical analysis should not be construed as individualized professional advice.
          </p>

          <h2 className="text-xl font-bold font-serif text-white pt-4 border-b border-slate-800 pb-2">4. User Comments & Conduct</h2>
          <p>
            Users engaging in discussion forums on LATEST BRIEF must refrain from posting hate speech, illegal material, spam, or promotional links. We reserve the right to moderate or delete comments violating community guidelines.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
