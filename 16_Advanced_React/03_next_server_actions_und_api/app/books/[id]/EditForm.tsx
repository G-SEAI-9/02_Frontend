// Client Component, weil useActionState ein Hook ist
'use client';

import { editBook } from '@/app/lib/actions';
import { Book } from '@/app/lib/types';
import { useActionState } from 'react';

export default function EditForm({ book }: { book: Book }) {
  // useActionState verbindet das Formular mit der Server Action:
  // - state: das zuletzt von editBook zurückgegebene Objekt (Start: {})
  // - formAction: kommt in <form action>, ruft editBook mit den FormData auf
  // - pending: true, solange die Action auf dem Server läuft
  const [state, formAction, pending] = useActionState(editBook, {});

  return (
    <form action={formAction}>
      <fieldset className='fieldset bg-base-200 rounded-box max-w-sm p-4'>
        <legend className='fieldset-legend'>Buch bearbeiten</legend>

        {/* Unsichtbar, aber Teil der FormData -> die Action weiß, welches Buch gemeint ist */}
        <input type='hidden' name='id' value={book.id} />

        <label className='label' htmlFor='title'>
          Titel
        </label>
        {/* Nach einem Fehler die Eingabe des Users zeigen, sonst den Wert aus der DB */}
        <input id='title' name='title' className='input' defaultValue={state.values?.title ?? book.title} />
        {state.errors?.title && <p className='text-error'>{state.errors.title[0]}</p>}

        <label className='label' htmlFor='release_year'>
          Erscheinungsjahr
        </label>
        <input
          id='release_year'
          name='release_year'
          type='number'
          className='input'
          defaultValue={state.values?.release_year ?? book.release_year ?? ''}
        />
        {state.errors?.release_year && <p className='text-error'>{state.errors.release_year[0]}</p>}

        <button className='btn btn-primary mt-2' disabled={pending}>
          {pending ? 'Speichert …' : 'Speichern'}
        </button>
        {state.success && !pending && (
          <p role='status' className='text-success '>
            Gespeichert!
          </p>
        )}
      </fieldset>
    </form>
  );
}
