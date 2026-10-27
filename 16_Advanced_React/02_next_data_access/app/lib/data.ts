// Data Access Layer (DAL): Alle Datenbankzugriffe liegen gebündelt in dieser Datei.
// Seiten rufen nur fertige Funktionen wie getBooks() auf und schreiben selbst kein SQL.
// So gibt es genau eine Stelle, an der man Abfragen anpasst, prüft oder absichert.
import postgres from 'postgres';
import { Author, Book } from './types';

// Stellt die Verbindung zu Postgres her. Die Adresse kommt aus der .env-Datei (siehe .env.example).
// Dieser Code läuft nur auf dem Server, deshalb landen Zugangsdaten nie im Browser.
const sql = postgres(process.env.PG_URI!);

// sql`...` ist ein Tagged Template: Die Abfrage wird als normaler SQL-String geschrieben.
// <Book[]> gibt an, welche Form die zurückgegebenen Zeilen haben, damit TypeScript uns beim Verwenden hilft.
async function getBooks() {
  return sql<Book[]>`select id, title, release_year from books order by release_year`;
}

async function getBookById(id: string) {
  // ${id} wird nicht einfach in den String geklebt, sondern als eigener Parameter an die Datenbank geschickt.
  // Das schützt vor SQL-Injection, auch wenn id aus der URL kommt.
  // Das Ergebnis ist immer ein Array. Mit [book] nehmen wir die erste Zeile (oder undefined, wenn es keine gibt).
  const [book] = await sql<Book[]>`select id, release_year, title from books where id = ${id}`;
  return book;
}

// Über die Zwischentabelle author_books finden wir alle Autor:innen eines Buches.
async function getAuthorsOfBook(id: string) {
  const authors = await sql<Author[]>`
    select a.id, a.name, a.birth_year
      from authors a
      join author_books ab on ab.author_id = a.id
      where ab.book_id = ${id}
      order by a.name
  `;
  return authors;
}

export { sql, getBooks, getBookById, getAuthorsOfBook };
