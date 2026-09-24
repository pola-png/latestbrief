import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Award, Target, Users, BookOpen, ArrowLeft, Mail, Globe, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | LATEST BRIEF Newsroom & Editorial Standards',
  description: 'Learn about LATEST BRIEF, our mission for editorial integrity, expert journalism staff, fact-checking standards, and global news coverage.',
  alternates: {
    canonical: 'https://latestbrief.com/about',
  },
  openGraph: {
    title: 'About Us | LATEST BRIEF News Network',
    description: 'Learn about LATEST BRIEF, our mission for editorial integrity, expert journalism staff, and global news coverage.',
    url: 'https://latestbrief.com/about',
    siteName: 'LATEST BRIEF',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-12 w-full space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Top Headlines
          </Link>
        </div>

        {/* Hero Section */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <span className="inline-flex items-center px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest rounded-md">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
            Editorial Transparency & Mission
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            About LATEST BRIEF
          </h1>
          <p className="text-lg text-slate-300 font-serif leading-relaxed">
            Delivering high-precision, factual journalism and strategic intelligence across artificial intelligence, global macroeconomics, space science, and climate innovation.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-serif text-white flex items-center">
            <Target className="w-6 h-6 text-amber-400 mr-2.5" />
            Our Core Mission & Philosophy
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Founded with a steadfast commitment to accuracy, depth, and clarity, LATEST BRIEF operates as an independent news publication dedicated to cutting through noise and clickbait. In an age dominated by superficial summaries and automated feed churning, our mission is to provide in-depth, verified analysis that explains not only <em>what</em> is happening in the world, but <em>why</em> it matters.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            We adhere strictly to the highest principles of journalistic rigor: original sourcing, comprehensive multi-paragraph contextual reporting, expert peer review, and transparent corrections. Every dispatch published on LATEST BRIEF undergoes thorough fact-checking to ensure our readers receive actionable, trustworthy insights.
          </p>
        </div>

        {/* Editorial Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif text-white">Verified Sourcing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We rely exclusively on primary research papers, direct expert interviews, official institutional disclosures, and verified press briefings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif text-white">In-Depth Analysis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our publications provide complete, multi-section coverage with technical breakdowns, executive key takeaways, and data tables.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif text-white">E-E-A-T Expertise</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Articles are authored by credentialed specialists in astrophysics, quantum computing, financial economics, and environmental policy.
            </p>
          </div>
        </div>

        {/* Editorial Board Transparency */}
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <h2 className="text-2xl font-bold font-serif text-white flex items-center">
            <Users className="w-6 h-6 text-amber-400 mr-2.5" />
            Senior Editorial Board
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="block text-sm font-bold text-white">Dr. Elena Vance</span>
              <span className="block text-xs text-amber-400 font-semibold uppercase tracking-wider">Chief Tech & AI Correspondent</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ph.D. in Computational Physics with 14 years of research experience in quantum algorithms and neural network architectures.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="block text-sm font-bold text-white">Julian Thorne</span>
              <span className="block text-xs text-amber-400 font-semibold uppercase tracking-wider">Senior Financial & Markets Editor</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Former macroeconomic strategy analyst covering central bank monetary policy, international logistics, and capital asset flows.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="block text-sm font-bold text-white">Dr. Sarah Al-Mansoor</span>
              <span className="block text-xs text-amber-400 font-semibold uppercase tracking-wider">Astrophysics & Space Lead</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Specialist in planetary atmospheric transmission spectroscopy and observational deep space telescope data interpretation.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="block text-sm font-bold text-white">Henrik Lindqvist</span>
              <span className="block text-xs text-amber-400 font-semibold uppercase tracking-wider">Climate & Renewable Energy Analyst</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clean technology systems engineer specializing in offshore wind platform design, hydrogen storage, and electrical grid balancing.
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Inquiries Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-serif text-white">Have a News Tip or Editorial Query?</h3>
            <p className="text-xs text-slate-400">Our newsroom desk is available for reader inquiries, press releases, and corrections.</p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0"
          >
            Contact Newsroom
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
