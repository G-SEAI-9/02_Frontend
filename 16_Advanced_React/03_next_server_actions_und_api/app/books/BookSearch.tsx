'use client';

import { useEffect, useState } from 'react';
import { Book } from '../lib/types';
import Link from 'next/link';

export default function BookSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const q = query.trim();

  useEffect(() => {
    // von Client Component nicht direkt die DB
    // -> fetch gegen eignen GET Endpunkt
    const controller = new AbortController();
    // Debouncing
    const timeout = setTimeout(() => {
      fetch(`/api/books?${new URLSearchParams({ query: q })}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((err) => err.name !== 'AbortError' && console.log(err));
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [q]);

  return (
    <div className='relative'>
      <search>
        <input
          type='search'
          className='input w-full'
          placeholder='Buch suchen …'
          aria-label='Buch suchen'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </search>
      {q.length >= 2 && results.length > 0 && (
        <ul className='menu absolute top-full z-10 w-full rounded-box bg-base-300 shadow'>
          {results.map((book) => (
            <li key={book.id}>
              <Link href={`/books/${book.id}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
