import { NextRequest, NextResponse } from 'next/server';
import { likeArticle } from '@/lib/articles';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, error: 'Article ID is required' }, { status: 400 });
  }

  const result = likeArticle(id);
  if (!result.success) {
    return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, likes: result.likes });
}
