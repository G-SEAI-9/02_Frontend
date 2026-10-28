import { searchBooks } from '@/app/lib/data';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('Request eingetroffen!');
  const query = request.nextUrl.searchParams.get('query')?.trim() ?? '';

  if (query.length < 2) return Response.json([]);
  if (query.length > 100) return Response.json({ error: 'Suchbegriff zu lang' }, { status: 400 });

  const books = await searchBooks(query);
  // console.log(books);
  return Response.json(books);
}
