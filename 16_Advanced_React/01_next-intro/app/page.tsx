// File-based Routing: app/page.tsx ist die Startseite, also die Route "/".
// Eine Datei namens page.tsx macht einen Ordner erst zu einer aufrufbaren Seite.
// Der default export ist die Komponente, die Next.js für diese Route rendert.
// Ohne 'use client' ist jede Komponente in app/ automatisch eine Server Component.
export default function Home() {
  return (
    <div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <h1>Wilkommen zu Next.js</h1>
    </div>
  );
}
