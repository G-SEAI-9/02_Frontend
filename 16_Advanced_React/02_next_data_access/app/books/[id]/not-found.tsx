// not-found.tsx wird angezeigt, sobald in diesem Ordner notFound() aufgerufen wird (siehe page.tsx).
// Next.js schickt dazu den HTTP-Status 404. Das Layout drumherum bleibt erhalten.
export default function NotFound() {
  return <div>Buch nicht gefunden</div>;
}
