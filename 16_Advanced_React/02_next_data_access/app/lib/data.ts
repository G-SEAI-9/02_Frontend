import postgres from 'postgres';
import { Author, Book } from './types';

const sql = postgres(process.env.PG_URI!);

async function getBooks() {
  return sql<Book[]>`select id, title, release_year from books order by release_year`;
}

async function getBookById(id: string) {
  const [book] = await sql<Book[]>`select id, release_year, title from books where id = ${id}`;
  return book;
}

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
