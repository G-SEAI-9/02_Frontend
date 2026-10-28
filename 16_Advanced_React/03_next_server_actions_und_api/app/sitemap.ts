import type { MetadataRoute } from 'next';
import { siteURL } from './lib/site';
import { getBooks } from './lib/data';

// sitemap.ts wird von Next.js automatisch unter /sitemap.xml ausgeliefert.
// Die Sitemap listet alle Seiten auf, damit Suchmaschinen sie finden, auch solche ohne Link von außen.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const books = await getBooks();

  // const booksMap = books.map((book) => ({ url: `${siteURL}/books/${book.id}`, changeFrequency: "daily" }));

  return [
    // changeFrequency und priority sind nur Hinweise an den Crawler, keine Befehle.
    { url: siteURL, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteURL}/about`, changeFrequency: 'yearly' },
    { url: `${siteURL}/recipes`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteURL}/books`, changeFrequency: 'weekly', priority: 0.8 },
    // Dynamische Seiten: Für jedes Buch aus der Datenbank kommt ein eigener Eintrag dazu.
    ...books.map((book) => ({ url: `${siteURL}/books/${book.id}`, changeFrequency: 'daily' as const })),
  ];
}
