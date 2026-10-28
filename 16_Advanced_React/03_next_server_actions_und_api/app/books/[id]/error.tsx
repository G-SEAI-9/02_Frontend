'use client';

import { useEffect } from 'react';

export default function BookError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error); // -> z.B. Sentry
  }, [error]);

  return (
    <div role='alert' className='alert alert-error flex flex-col items-start gap-2'>
      <h2 className='font-semibold'>Dieses Buch konnte nicht geladen werden.</h2>
      <p className='text-sm'>{error instanceof Error ? error.message : String(error)}</p>
      <button className='btn btn-sm' onClick={retry}>
        Nochmal versuchen
      </button>
    </div>
  );
}
