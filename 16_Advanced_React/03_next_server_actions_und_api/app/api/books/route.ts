import { searchBooks } from '@/app/lib/data';
import type { NextRequest } from 'next/server';

// Route Handler: route.ts unter app/api/books -> GET /api/books?query=...
// Der Funktionsname bestimmt die HTTP-Methode.
// Für unabhängige Requests wie Lesen/Suchen: laufen parallel, abbrechbar, per GET cachebar.
export async function GET(request: NextRequest) {
  console.log('Request eingetroffen!');
  const query = request.nextUrl.searchParams.get('query')?.trim() ?? '';

  // Öffentlicher Endpunkt -> Eingabe prüfen, bevor sie an die DB geht
  if (query.length < 2) return Response.json([]);
  if (query.length > 100) return Response.json({ error: 'Suchbegriff zu lang' }, { status: 400 });

  const books = await searchBooks(query);
  // console.log(books);
  return Response.json(books);
}
