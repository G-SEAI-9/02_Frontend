import type { Metadata } from 'next';
import { cacheLife } from 'next/cache';
import { Suspense } from 'react';

type Recipe = { id: number; name: string; cuisine: string; difficulty: string; prepTimeMinutes: number };

export const metadata: Metadata = {
  title: 'Recipes',
  description: 'Rezepte der besten Next.js-Demoseite!',
};

export default function RecipePage() {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold font-display'>Yummy Recipes</h1>
      <Suspense
        fallback={
          <p>
            Loading <span className='loading loading-dots'></span>{' '}
          </p>
        }
      >
        <RecipeList />
      </Suspense>
      <Suspense>{/* Wetterbericht */}</Suspense>
    </div>
  );
}

async function RecipeList() {
  'use cache';
  cacheLife('hours');

  await new Promise((res, _err) => setTimeout(res, 2000));
  const res = await fetch('https://dummyjson.com/recipes');
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
