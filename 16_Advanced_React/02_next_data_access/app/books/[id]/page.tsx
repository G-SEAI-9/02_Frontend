import { getAuthorsOfBook, getBookById } from '@/app/lib/data';
import { cacheLife } from 'next/cache';
import { notFound } from 'next/navigation';

// Dynamisches Routing: Der Ordnername [id] in eckigen Klammern ist ein Platzhalter.
// /books/1, /books/2, /books/42 ... werden alle von dieser einen Seite gerendert.
// PageProps<'/books/[id]'> ist ein von Next.js generierter Typ, der weiß, dass es einen Parameter id gibt.
export default async function BookDetailsPage({ params }: PageProps<'/books/[id]'>) {
  'use cache';
  cacheLife('hours');

  // params ist ein Promise und muss erst mit await ausgepackt werden.
  // Der Wert aus der URL ist immer ein String, auch wenn er wie eine Zahl aussieht.
  const { id } = await params;

  // Eingaben aus der URL nie ungeprüft weitergeben: gültige ids bestehen nur aus Ziffern.
  // Ohne diese Prüfung würde Postgres bei /books/abc einen Fehler werfen (500) statt einer 404-Seite.
  // notFound() bricht das Rendern sofort ab und zeigt not-found.tsx an.
  // Das wäre auch eine gute Einsatzmöglichkeit für Zod!
  if (!/^\d{1,9}$/.test(id)) notFound();

  // Künstliche Verzögerung, damit wir loading.tsx sehen.
  await new Promise((res, _err) => setTimeout(res, 2000));

  const book = await getBookById(id);

  // Gültige id, aber kein Buch in der Datenbank: ebenfalls 404.
  // Nach dieser Zeile weiß TypeScript, dass book nicht mehr undefined sein kann.
  if (!book) notFound();

  const authors = await getAuthorsOfBook(id);
  // Mögliche Optimierung: getBookById und getAuthorsOfBook parallel laufen lassen.

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
    </article>
  );
}
