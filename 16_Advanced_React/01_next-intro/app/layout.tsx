import type { Metadata } from 'next';
// next/font lädt Google Fonts beim Build herunter und liefert sie von unserem eigenen Server aus.
// Der Browser fragt also nie bei Google an (schneller, datenschutzfreundlicher, kein Layout-Springen).
import { Fraunces, Geist, Geist_Mono } from 'next/font/google';
// Globales CSS wird einmal hier im Root-Layout importiert und gilt dann für alle Seiten.
import './globals.css';
// <Link> statt <a>: Navigation ohne kompletten Neuladen der Seite (client-seitiges Routing + Prefetching).
import Link from 'next/link';

// Jede Schrift bekommt eine CSS-Variable. In globals.css werden diese Variablen
// den Tailwind-Klassen font-sans, font-mono und font-display zugeordnet.
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
});

// Metadaten: Next.js erzeugt daraus automatisch <title> und <meta name="description"> im <head>.
// Im Root-Layout gelten sie als Standard für alle Seiten; einzelne Seiten können sie überschreiben.
export const metadata: Metadata = {
  title: 'Meine coole Next Demo',
  description: 'Die beste Seite, um Next.js Features zu demonstrieren!',
};

// Das Root-Layout (app/layout.tsx) ist Pflicht und umschließt JEDE Seite der App.
// Es bleibt beim Navigieren bestehen; nur `children` (die aktuelle page.tsx) wird ausgetauscht.
// LayoutProps<'/'> ist ein Typ, den Next.js automatisch passend zur Route generiert.
export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // Nur das Root-Layout darf <html> und <body> rendern.
    // Die Schrift-Variablen werden hier auf <html> gesetzt, damit sie überall verfügbar sind.
    <html lang='de' className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col font-sans'>
        {/* Header und Navigation stehen im Layout, damit sie auf allen Seiten erscheinen. */}
        <header className='navbar bg-base-200 shadow-sm'>
          <div className='mx-auto flex w-full max-w-4xl items-center gap-4'>
            <Link href='/' className='btn btn-ghost font-display text-xl'>
              📚 Books Demo
            </Link>

            <nav>
              <ul className='menu menu-horizontal'>
                {/* Die href-Pfade entsprechen den Ordnern in app/ (file-based Routing). */}
                <li>
                  <Link href='/books'>Books</Link>
                </li>
                <li>
                  <Link href='/recipes'>Recipes</Link>
                </li>
                <li>
                  <Link href='/about'>About</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {/* Hier wird die page.tsx der aktuellen Route eingesetzt. */}
        <main className='mx-auto w-full max-w-4xl flex-1 p-4'>{children}</main>
      </body>
    </html>
  );
}
