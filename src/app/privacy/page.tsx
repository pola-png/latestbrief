import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Lock, ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | LATEST BRIEF News Network',
  description: 'Learn how LATEST BRIEF collects, protects, and uses personal data, cookies, Google AdSense disclosures, and user rights.',
  alternates: {
    canonical: 'https://latestbrief.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | LATEST BRIEF',
    description: 'Learn how LATEST BRIEF protects personal data, cookies, and privacy rights.',
    url: 'https://latestbrief.com/privacy',
    siteName: 'LATEST BRIEF',
    type: 'website',
  },
};

export default function PrivacyPage() {
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
            <Lock className="w-3.5 h-3.5 mr-1.5" />
            Legal & Data Protection
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">
            Effective Date: September 24, 2026 • Last Updated: September 24, 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-6">
          <p>
            At <strong>LATEST BRIEF</strong> (accessible from https://latestbrief.com), one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information collected and recorded by LATEST BRIEF and how we use it.
          </p>

          <h2 className="text-xl font-bold font-serif text-white pt-4 border-b border-slate-800 pb-2">
            1. Information We Collect
          </h2>
          <p>
            When you visit LATEST BRIEF, we may collect information directly provided by you (such as your email address when subscribing to our newsletter or submitting a comment) as well as automatically collected technical logs (such as IP addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and click counts).
          </p>

          <h2 className="text-xl font-bold font-serif text-white pt-4 border-b border-slate-800 pb-2">
            2. Google AdSense & DoubleClick DART Cookies
          </h2>
          <p>
            Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to https://latestbrief.com and other sites on the internet.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.
            </li>
            <li>
              Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">Google Ads Settings</a>.
            </li>
          </ul>

          <h2 className="text-xl font-bold font-serif text-white pt-4 border-b border-slate-800 pb-2">
            3. Privacy Policies of Third-Party Advertising Partners
          </h2>
          <p>
            LATEST BRIEF's Privacy Policy does not apply to other advertisers or websites. Thus, we advise you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>

          <h2 className="text-xl font-bold font-serif text-white pt-4 border-b border-slate-800 pb-2">
            4. GDPR Compliance (General Data Protection Regulation)
          </h2>
          <p>
            If you reside in the European Economic Area (EEA), you have certain data protection rights. LATEST BRIEF aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The right to access, update, or delete the information we have on you.</li>
            <li>The right of rectification.</li>
            <li>The right to object to processing.</li>
            <li>The right of data portability.</li>
          </ul>

          <h2 className="text-xl font-bold font-serif text-white pt-4 border-b border-slate-800 pb-2">
            5. CCPA Compliance (California Consumer Privacy Act)
          </h2>
          <p>
            Under the CCPA, California consumers have the right to request that a business disclose the categories and specific pieces of personal data collected, as well as request deletion of such data. LATEST BRIEF does not sell personal consumer data.
          </p>

          <h2 className="text-xl font-bold font-serif text-white pt-4 border-b border-slate-800 pb-2">
            6. Contact Privacy Desk
          </h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us by email at <strong>privacy@latestbrief.com</strong>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
