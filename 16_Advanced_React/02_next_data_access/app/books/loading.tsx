// loading.tsx: Next.js packt page.tsx in diesem Ordner automatisch in eine <Suspense>-Grenze
// und nutzt diese Komponente als fallback. Wir müssen Suspense also nicht selbst schreiben.
// Layout und Navigation bleiben sichtbar, nur der Seiteninhalt wird durch den Ladezustand ersetzt.
export default function Loading() {
  return (
    <p>
      Bücher werden geladen <span className='loading loading-dots'></span>
    </p>
  );
}
