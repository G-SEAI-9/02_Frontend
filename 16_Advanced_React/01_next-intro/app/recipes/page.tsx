// Route "/recipes" (Ordner app/recipes/ + page.tsx).
import { cacheLife } from 'next/cache';
import { Suspense } from 'react';

type Recipe = { id: number; name: string; cuisine: string; difficulty: string; prepTimeMinutes: number };

export default function RecipePage() {
  return (
    <div className='flex flex-col gap-4'>
      <title>Recipes | Demo</title>
      {/* Überschrift steht außerhalb von Suspense und wird deshalb sofort angezeigt. */}
      <h1 className='text-2xl font-bold font-display'>Yummy Recipes</h1>
      {/* Suspense: Solange RecipeList noch lädt, zeigt React den fallback an.
          Sobald die Daten da sind, streamt der Server das fertige HTML nach und ersetzt den fallback. */}
      <Suspense
        fallback={
          <p>
            Loading <span className='loading loading-dots'></span>{' '}
          </p>
        }
      >
        <RecipeList />
      </Suspense>
      {/* Jede Suspense-Grenze lädt unabhängig, ein langsamer Teil blockiert die anderen nicht. */}
      <Suspense>{/* Wetterbericht */}</Suspense>
    </div>
  );
}

// Async Server Component: Nur Server Components dürfen async sein und Daten direkt mit await laden.
// Kein useEffect, kein useState für Ladezustand nötig – das erledigt Suspense oben.
async function RecipeList() {
  // 'use cache' speichert das Ergebnis dieser Komponente zwischen.
  // Weitere Aufrufe bekommen die gecachte Version, ohne erneut zu warten oder zu fetchen.
  'use cache';
  // cacheLife legt fest, wie lange der Cache gültig ist ('hours' = eingebautes Profil, ca. stündlich erneuert).
  cacheLife('hours');

  // Künstliche Verzögerung von 2 Sekunden, damit man den Suspense-fallback sieht.
  await new Promise((res, err) => setTimeout(res, 2000));
  const res = await fetch('https://dummyjson.com/recipes'); // läuft auf dem Server
  const { recipes }: { recipes: Recipe[] } = await res.json();

  return (
    <ul className='list rounded-box bg-base-200'>
      {recipes.map((recipe) => (
        <li key={recipe.id} className='list-row'>
          <div>
            <div className='font-semibold'>{recipe.name}</div>
            <div className='text-sm opacity-70'>
              {recipe.cuisine} · {recipe.difficulty} · {recipe.prepTimeMinutes} min prep
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
