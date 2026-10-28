// opengraph-image.tsx erzeugt für jede Buchseite ein eigenes Vorschaubild (z. B. /books/3/opengraph-image).
// Next.js trägt es automatisch als <meta property="og:image"> in den <head> der Seite ein:
// Teilt jemand den Link in Slack oder LinkedIn, erscheint dieses Bild.
import { ImageResponse } from 'next/og';
import { getBookById } from '@/app/lib/data';

// Das empfohlene Format für Link-Vorschauen.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Vorschaubild eines Buches aus der Books Demo';

export default async function Image({ params }: PageProps<'/books/[id]'>) {
  const { id } = await params;
  // Gleiche Prüfung wie in page.tsx, sonst wirft Postgres bei /books/abc/opengraph-image.
  const book = /^\d{1,9}$/.test(id) ? await getBookById(id) : undefined;

  // ImageResponse macht aus JSX ein PNG. Erlaubt ist nur ein Teil von CSS (Flexbox, kein Grid),
  // und zwar über style statt über Tailwind-Klassen. Ein div mit mehreren Kindern braucht display: 'flex',
  // deshalb ist "Erschienen …" unten ein einziger String statt Text plus {Ausdruck}.
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#1f1a17',
          color: '#f5efe6',
        }}
      >
        <div style={{ fontSize: 36, opacity: 0.7 }}>Books Demo</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 80 }}>{book?.title ?? 'Buch nicht gefunden'}</div>
          {book?.release_year && <div style={{ fontSize: 40, opacity: 0.7 }}>{`Erschienen ${book.release_year}`}</div>}
        </div>
      </div>
    ),
    size,
  );
}
