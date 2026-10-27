// Legt die drei Demo-Tabellen neu an und füllt sie mit einem kleinen Datensatz.
// Achtung: Bestehende Tabellen books, authors und author_books werden gelöscht.
// Ausführen mit: node --env-file=.env db/seed.ts
import postgres from 'postgres';

const sql = postgres(process.env.PG_URI!, { onnotice: () => {} });

const authors = [
  { name: 'Astrid Lindgren', birth_year: 1907 },
  { name: 'J.R.R. Tolkien', birth_year: 1892 },
  { name: 'Stephen King', birth_year: 1947 },
  { name: 'Peter Straub', birth_year: 1943 },
  { name: 'Terry Pratchett', birth_year: 1948 },
  { name: 'Neil Gaiman', birth_year: 1960 },
  { name: 'Ursula K. Le Guin', birth_year: 1929 },
];

const books = [
  { title: 'Pippi Langstrumpf', release_year: 1945 },
  { title: 'Ronja Räubertochter', release_year: 1981 },
  { title: 'Der Hobbit', release_year: 1937 },
  { title: 'Die Gefährten', release_year: 1954 },
  { title: 'Shining', release_year: 1977 },
  { title: 'Der Talisman', release_year: 1984 },
  { title: 'Geisterstunde', release_year: 1979 },
  { title: 'Good Omen', release_year: 1990 },
  { title: 'Gevatter Tod', release_year: 1987 },
  { title: 'American Gods', release_year: 2001 },
  { title: 'Wizard of Earthsea', release_year: 1968 },
  { title: 'Left Hand of Darkness', release_year: 1969 },
];

// Verknüpfung über Name und Titel statt fester ids. Zwei Bücher haben je zwei Autor:innen.
const pairs = [
  ['Astrid Lindgren', 'Pippi Langstrumpf'],
  ['Astrid Lindgren', 'Ronja Räubertochter'],
  ['J.R.R. Tolkien', 'Der Hobbit'],
  ['J.R.R. Tolkien', 'Die Gefährten'],
  ['Stephen King', 'Shining'],
  ['Stephen King', 'Der Talisman'],
  ['Peter Straub', 'Der Talisman'],
  ['Peter Straub', 'Geisterstunde'],
  ['Terry Pratchett', 'Good Omen'],
  ['Neil Gaiman', 'Good Omen'],
  ['Terry Pratchett', 'Gevatter Tod'],
  ['Neil Gaiman', 'American Gods'],
  ['Ursula K. Le Guin', 'Wizard of Earthsea'],
  ['Ursula K. Le Guin', 'Left Hand of Darkness'],
];

// Alles in einer Transaktion: Geht etwas schief, bleibt die Datenbank wie vorher.
await sql.begin(async (sql) => {
  await sql`drop table if exists author_books, books, authors`;

  await sql`
    create table authors (
      id integer generated always as identity primary key,
      name text not null unique,
      birth_year integer
    )
  `;
  await sql`
    create table books (
      id integer generated always as identity primary key,
      title text not null unique,
      release_year integer
    )
  `;
  // Eine Zeile pro Paar (Autor:in, Buch). Wird ein Buch gelöscht, verschwinden seine Verknüpfungen mit.
  await sql`
    create table author_books (
      author_id integer not null references authors (id) on delete cascade,
      book_id integer not null references books (id) on delete cascade,
      primary key (author_id, book_id)
    )
  `;

  // sql(array) macht aus einem Array von Objekten ein mehrzeiliges insert.
  const authorRows = await sql`insert into authors ${sql(authors)} returning id, name`;
  const bookRows = await sql`insert into books ${sql(books)} returning id, title`;

  const authorId = new Map(authorRows.map((a) => [a.name, a.id]));
  const bookId = new Map(bookRows.map((b) => [b.title, b.id]));
  const links = pairs.map(([author, book]) => ({
    author_id: authorId.get(author),
    book_id: bookId.get(book),
  }));
  await sql`insert into author_books ${sql(links)}`;
});

console.log(`Fertig: ${authors.length} Autor:innen, ${books.length} Bücher, ${pairs.length} Verknüpfungen.`);
await sql.end();
