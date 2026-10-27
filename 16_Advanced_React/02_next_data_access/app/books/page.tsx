import { cacheLife } from 'next/cache';
import { getBooks } from '../lib/data';
import Link from 'next/link';

// Eine async Server Component darf direkt auf die Datenbank zugreifen.
// Kein API-Endpunkt und kein fetch nötig: Die Abfrage läuft auf dem Server, im Browser kommt nur fertiges HTML an.
export default async function BooksPage() {
  'use cache';
  cacheLife('days');

  // Holt die Bücher über die Data Access Layer (app/lib/data.ts) statt mit SQL direkt in der Seite.
  const books = await getBooks();

  // console.log(books);

  return (
    <div className='flex flex-col gap-4'>
      <title>Books | Demo</title>
      <h1 className='text-2xl font-bold font-display'>Books</h1>
      <ul className='list rounded-box bg-base-200'>
        {books.map((book) => (
          // Jeder Eintrag verlinkt auf die dynamische Route /books/[id], z. B. /books/3.
          <Link key={book.id} href={`/books/${book.id}`}>
            <li className='list-row'>
              <h2 className='font-semibold'>{book.title}</h2>
              <p className='text-sm opacity-70'>{book.release_year ?? 'Jahr unbekannt'}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
