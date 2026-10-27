import { cacheLife } from 'next/cache';
import postgres from 'postgres';

const sql = postgres(process.env.PG_URI!);

type Book = {
  id: number;
  title: string;
  release_year: number | null;
};

export default async function BooksPage() {
  'use cache';
  cacheLife('days');

  const books = await sql<Book[]>`select id, title, release_year from books order by release_year`;

  // console.log(books);

  return (
    <div className='flex flex-col gap-4'>
      <title>Books | Demo</title>
      <h1 className='text-2xl font-bold font-display'>Books</h1>
      <ul className='list rounded-box bg-base-200'>
        {books.map((book) => (
          <li key={book.id} className='list-row'>
            <h2 className='font-semibold'>{book.title}</h2>
            <p className='text-sm opacity-70'>{book.release_year ?? 'Jahr unbekannt'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
