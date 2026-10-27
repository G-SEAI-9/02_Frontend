// Moderne SQL-Bibliotheken - ORMs wie Prisma oder Drizzle
// lassen uns die Types auch direkt aus der SQL-Tabelle ableiten.
// Beim einfachen node postgres haben wir das leider nicht.

type Book = {
  id: number;
  title: string;
  release_year: number | null;
};

type Author = {
  id: number;
  name: string;
  birth_year: number;
};

export type { Book, Author };
