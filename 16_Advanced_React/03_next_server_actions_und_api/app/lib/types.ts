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
