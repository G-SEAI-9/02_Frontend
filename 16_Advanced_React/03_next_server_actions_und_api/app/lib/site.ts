// Absolute Basis-URL der Seite. Sitemap, robots.txt und Open-Graph-Tags brauchen vollständige URLs
// (https://…), weil Suchmaschinen und Social-Media-Dienste sie außerhalb unserer Seite lesen.
// In Produktion kommt die echte Domain aus der Umgebungsvariable SITE_URL.
export const siteURL = process.env.SITE_URL ?? 'http://localhost:3000';
