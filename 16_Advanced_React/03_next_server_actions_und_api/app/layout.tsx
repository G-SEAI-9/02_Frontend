import type { Metadata } from 'next';
import { Fraunces, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { siteURL } from './lib/site';

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

// Metadaten im Root-Layout gelten für alle Seiten. Next.js schreibt sie als <title>- und <meta>-Tags in den <head>.
// Unterseiten können einzelne Felder mit eigenem metadata-Export überschreiben.
export const metadata: Metadata = {
  title: {
    // %s wird durch den Titel der Unterseite ersetzt: 'Books' wird zu 'Books | Demo'.
    // default greift auf Seiten, die keinen eigenen Titel setzen.
    template: '%s | Demo',
    default: 'Meine coole Next Demo',
  },
  // Die description zeigt Google oft als Text unter dem Link im Suchergebnis an.
  description: 'Die beste Seite, um Next.js Features zu demonstrieren!',
  // Macht relative URLs in den Metadaten (z. B. canonical oder og:image) zu absoluten URLs.
  metadataBase: new URL(siteURL),
  // Open Graph steuert die Link-Vorschau, wenn jemand die Seite in Slack, LinkedIn & Co. teilt.
  openGraph: {
    siteName: 'Books Demo',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // lang='de' sagt Suchmaschinen und Screenreadern, in welcher Sprache die Seite geschrieben ist.
    <html lang='de' className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col font-sans'>
        <header className='navbar bg-base-200 shadow-sm'>
          <div className='mx-auto flex w-full max-w-4xl items-center gap-4'>
            <Link href='/' className='btn btn-ghost font-display text-xl'>
              📚 Books Demo
            </Link>

            <nav>
              <ul className='menu menu-horizontal'>
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
        <main className='mx-auto w-full max-w-4xl flex-1 p-4'>{children}</main>
      </body>
    </html>
  );
}
