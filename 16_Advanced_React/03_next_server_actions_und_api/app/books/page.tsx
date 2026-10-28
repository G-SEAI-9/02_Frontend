import { cacheLife, cacheTag, CacheEntry } from 'next/cache';
import { getBooks } from '../lib/data';
import Link from 'next/link';
import BookSearch from './BookSearch';

export default async function BooksPage() {
  'use cache';
  cacheLife('days');
  cacheTag('books');

  await new Promise((res, _err) => setTimeout(res, 2000));

  const books = await getBooks();

  return (
    <div className='flex flex-col gap-4'>
      <title>Books | Demo</title>
      <h1 className='text-2xl font-bold font-display'>Books</h1>

      <BookSearch />

      <ul className='list rounded-box bg-base-200'>
        {books.map((book) => (
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
