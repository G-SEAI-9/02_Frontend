// Statische Route /books/hobbit. Sie hat Vorrang vor der dynamischen Route /books/[id]:
// Bei /books/hobbit wird diese Seite angezeigt, nicht [id] mit id = 'hobbit'.
// Passt auf, dass nicht Namenskonflikte entstehen.
export default function HobbitPage() {
  return <div>Der Hobbit</div>;
}
