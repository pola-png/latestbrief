import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookmarkButton } from '@/components/BookmarkButton';
import { ShareButtons } from '@/components/ShareButtons';
import { AudioReader } from '@/components/AudioReader';
import { CommentsSection } from '@/components/CommentsSection';
import { ArticleCard } from '@/components/ArticleCard';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import { Clock, Eye, ThumbsUp, CheckCircle2, ArrowLeft, Calendar, User, Tag, ChevronRight, Layers } from 'lucide-react';
import ArticleReaderClient from './ArticleReaderClient';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | LATEST BRIEF',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://latestbrief.com';
  const url = `${siteUrl}/article/${article.slug}`;

  return {
    title: `${article.title} | LATEST BRIEF`,
    description: article.excerpt,
    authors: [{ name: article.author.name }],
    keywords: article.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      siteName: 'LATEST BRIEF',
      images: [
        {
          url: article.image.startsWith('http') ? article.image : `${siteUrl}${article.image}`,
          width: 1200,
          height: 675,
          alt: article.title,
        },
      ],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image.startsWith('http') ? article.image : `${siteUrl}${article.image}`],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const categorySlug = article.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
  
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 3);

  const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://latestbrief.com';
  const articleUrl = `${siteUrl}/article/${article.slug}`;

  // JSON-LD NewsArticle Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': article.title,
    'description': article.excerpt,
    'image': [article.image.startsWith('http') ? article.image : `${siteUrl}${article.image}`],
    'datePublished': article.publishedAt,
    'dateModified': article.updatedAt || article.publishedAt,
    'author': [{
      '@type': 'Person',
      'name': article.author.name,
      'jobTitle': article.author.role
    }],
    'publisher': {
      '@type': 'Organization',
      'name': 'LATEST BRIEF',
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteUrl}/logo.png`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': articleUrl
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-10 w-full">
        {/* SEO Breadcrumbs Internal Linking */}
        <nav className="mb-6 flex items-center space-x-2 text-xs font-semibold text-slate-400 overflow-x-auto no-scrollbar">
          <Link href="/" className="hover:text-amber-400 transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <Link href={`/category/${categorySlug}`} className="hover:text-amber-400 transition-colors shrink-0">
            {article.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span className="text-slate-300 truncate max-w-[200px]">{article.title}</span>
        </nav>

        {/* Category & Badge */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href={`/category/${categorySlug}`}
            className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider rounded-md hover:bg-amber-500/20 transition-colors flex items-center"
          >
            <Layers className="w-3.5 h-3.5 mr-1.5" />
            {article.category}
          </Link>
          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {article.readTime} min read
            </span>
            <BookmarkButton article={article} />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-white leading-tight mb-4">
          {article.title}
        </h1>

        <p className="text-lg text-slate-300 font-serif leading-relaxed mb-6">
          {article.subtitle}
        </p>

        {/* Author Bio Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl mb-8">
          <div className="flex items-center space-x-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-amber-500/40 bg-slate-800">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="block text-sm font-bold text-white">{article.author.name}</span>
              <span className="block text-xs text-slate-400">{article.author.role}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs text-slate-400">
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-slate-500" />
              {publishedDate}
            </span>
            <ShareButtons title={article.title} url={articleUrl} />
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative w-full h-[320px] sm:h-[450px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 mb-4">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </div>
        {article.imageCaption && (
          <p className="text-xs text-slate-400 italic mb-8 border-l-2 border-slate-700 pl-3">
            {article.imageCaption}
          </p>
        )}

        {/* Audio TTS Reader */}
        <div className="mb-8">
          <AudioReader title={article.title} content={article.content} />
        </div>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="p-6 bg-slate-900/90 border-l-4 border-amber-500 rounded-r-xl mb-8 space-y-3 shadow-lg">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Executive Summary & Key Takeaways
            </h3>
            <ul className="space-y-2 text-sm text-slate-200 font-sans">
              {article.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-amber-400 font-bold mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Article Body Client Wrapper */}
        <ArticleReaderClient article={article} />

        {/* Tags with Internal Search Links */}
        <div className="pt-8 mb-12 flex flex-wrap items-center gap-2 border-t border-slate-800">
          <Tag className="w-4 h-4 text-slate-500 mr-2" />
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/search?q=${encodeURIComponent(tag)}`}
              className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 rounded-full transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Related Stories with Direct Internal Links */}
        {relatedArticles.length > 0 && (
          <div className="pt-8 border-t border-slate-800 space-y-6 mb-12">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-serif text-white">Related Intelligence & Coverage</h3>
              <Link
                href={`/category/${categorySlug}`}
                className="text-xs font-bold text-amber-400 hover:underline uppercase tracking-wider"
              >
                More in {article.category} →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <CommentsSection articleId={article.id} initialComments={article.comments} />

      </main>

      <Footer />
    </div>
  );
}
