'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Editorial Inquiry');
  const [messageText, setMessageText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && messageText) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-12 w-full space-y-10">
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
            <Mail className="w-3.5 h-3.5 mr-1.5" />
            Direct Communication Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            Contact LATEST BRIEF Newsroom
          </h1>
          <p className="text-sm text-slate-300 font-serif leading-relaxed">
            We value feedback, story tips, press submissions, and editorial corrections. Reach out directly to our editorial team below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-amber-400 pl-2">
                Editorial Office
              </h3>
              
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>LATEST BRIEF Newsroom Desk</strong><br />
                    100 Press Square, Suite 400<br />
                    Financial District, NY 10005
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>contact@latestbrief.com</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>+1 (212) 555-0192</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Mon - Fri: 08:00 - 18:00 EST</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Response Commitment</span>
              </div>
              <p className="leading-relaxed">
                Editorial corrections and factual inquiries are reviewed within 24 business hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold font-serif text-white">Message Transmitted</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you for contacting LATEST BRIEF. Your message has been routed to our newsroom desk.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Send an Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Inquiry Department *</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Editorial Inquiry">Editorial & News Desk</option>
                    <option value="Story Tip">Press Release / News Tip</option>
                    <option value="Correction">Fact-Check / Correction Request</option>
                    <option value="Advertising">Advertising & Syndication</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Message Details *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Provide details about your query or press announcement..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-3.5 focus:outline-none focus:border-amber-400 leading-relaxed"
                  ></textarea>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center space-x-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
