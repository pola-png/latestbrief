import { NextRequest, NextResponse } from 'next/server';
import { getAllArticles, getArticlesByCategory, searchArticles, createArticle } from '@/lib/articles';
import { CategoryType } from '@/types/article';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as CategoryType | 'All' | null;
  const search = searchParams.get('search');

  let articles = getAllArticles();

  if (search) {
    articles = searchArticles(search);
  } else if (category && category !== 'All') {
    articles = getArticlesByCategory(category);
  }

  return NextResponse.json({
    success: true,
    count: articles.length,
    articles
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body.title || !body.content || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Title, content, and category are required.' },
        { status: 400 }
      );
    }

    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newArticle = createArticle({
      title: body.title,
      subtitle: body.subtitle || '',
      excerpt: body.excerpt || body.content.substring(0, 160) + '...',
      content: body.content,
      category: body.category,
      author: body.author || {
        name: 'Antigravity Editorial AI',
        role: 'Senior Staff Publisher',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
      },
      slug,
      readTime: body.readTime || Math.max(1, Math.ceil(body.content.split(' ').length / 200)),
      image: body.image || '/images/tech_ai_cover.jpg',
      imageCaption: body.imageCaption || '',
      tags: body.tags || [body.category, 'News'],
      isFeatured: body.isFeatured || false,
      isBreaking: body.isBreaking || false,
      keyTakeaways: body.keyTakeaways || []
    });

    return NextResponse.json({
      success: true,
      message: 'Article published successfully!',
      article: newArticle
    }, { status: 201 });

  } catch (error) {
    console.error('API Publish Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process publication' },
      { status: 500 }
    );
  }
}
