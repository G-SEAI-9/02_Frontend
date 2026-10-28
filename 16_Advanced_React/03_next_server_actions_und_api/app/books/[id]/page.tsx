import { getAuthorsOfBook, getBookById } from '@/app/lib/data';
import { cacheLife, cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';
import EditForm from './EditForm';
import { title } from 'process';

export async function generateMetadate({ params }: PageProps<'/books/[id]'>) {
  'use cache';
  cacheLife('hours');
  cacheTag('books');
  const { id } = await params;

  if (!/^\d{1,9}$/.test(id)) notFound();

  const book = !/^\d{1,9}$/.test(id) ? await getBookById(id) : undefined;
  if (!book) return { title: 'Buch nicht gefunden' };

  return {
    title: book.title,
    description: `${book.title}, erschienen im Jahr ${book.release_year}`,
  };
}

export default async function BookDetailsPage({ params }: PageProps<'/books/[id]'>) {
  'use cache';
  cacheLife('hours');
  cacheTag('books');

  const { id } = await params;

  if (!/^\d{1,9}$/.test(id)) notFound();

  // await new Promise((res, _err) => setTimeout(res, 2000));

  // throw new Error('GREMLINS');

  const book = await getBookById(id);

  if (!book) notFound();

  const authors = await getAuthorsOfBook(id);

  return (
    <article className='flex flex-col gap-6'>
      <title>{`${book.title} | Demo`}</title>
      <div>
        <h1 className='text-2xl font-bold font-display'>{book.title}</h1>
        <p className='opacity-70'>Erschienen {book.release_year ?? 'in einem unbekannten Jahr'}</p>
      </div>

      <section className='flex flex-col gap-2'>
        <h2 className='text-lg font-semibold'>Autor:innen</h2>
        {authors.length === 0 && <p>Noch keine Autor:innen verknüpft.</p>}
        <ul className='list-disc pl-6'>
          {authors.map((author) => (
            <li key={author.id}>{author.name}</li>
          ))}
        </ul>
      </section>

      <EditForm book={book} />
    </article>
  );
}
