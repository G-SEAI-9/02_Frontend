import type { Metadata } from 'next';
import { Fraunces, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

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

export const metadata: Metadata = {
  title: 'Meine coole Next Demo',
  description: 'Die beste Seite, um Next.js Features zu demonstrieren!',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
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
