import { MetadataRoute } from 'next';
import { siteURL } from './lib/site';

// robots.ts wird von Next.js automatisch unter /robots.txt ausgeliefert.
// Die Datei sagt Suchmaschinen-Crawlern, welche Bereiche sie besuchen dürfen.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Die API liefert nur JSON für unsere App, das gehört nicht in Suchergebnisse.
      disallow: '/api/',
    },
    // Verweist den Crawler direkt auf unsere Sitemap.
    sitemap: `${siteURL}/sitemap.xml`,
  };
}
