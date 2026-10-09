import { useActionState } from 'react';
import action, { initialState } from './api/contact.js';
import SubmitBtn from './components/SubmitBtn.jsx';

// Stufe 4: useActionState.
// Die Action gibt einen neuen State zurück (eingegebene Werte + Fehler), und React speichert ihn für uns.
// So kommen Fehler zurück in die UI – ohne useState und ohne ErrorBoundary.
export default function App() {
  // useActionState(action, startwert) liefert:
  // - state:      der letzte Rückgabewert der Action (beim ersten Render: initialState)
  // - formAction: eine "verpackte" Action, die wir an <form action> übergeben
  // - isPending:  true, solange die Action läuft
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <main className='min-h-screen bg-gray-900 p-8 font-sans'>
      <div className='max-w-xl mx-auto bg-gray-950 p-6 rounded-lg shadow space-y-6'>
        <h2 className='text-2xl font-bold text-center text-gray-200'>Contact Us</h2>
        <form action={formAction} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-200' htmlFor='name'>
              Name
            </label>
            {/* React setzt das Formular nach der Action zurück. defaultValue aus dem State
                sorgt dafür, dass die Eingaben bei Fehlern trotzdem erhalten bleiben. */}
            <input
              name='name'
              id='name'
              disabled={isPending}
              defaultValue={state.input.name}
              className='w-full mt-1 border border-gray-300 rounded px-3 py-2'
              placeholder='Leia Organa'
            />
            {/* Fehler kommen jetzt aus dem Rückgabewert der Action */}
            {state.errors.name && <p className='text-sm text-red-600 mt-1'>{state.errors.name}</p>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='email'>
              Email
            </label>
            <input
              name='email'
              id='email'
              disabled={isPending}
              defaultValue={state.input.email}
              className='w-full mt-1 border border-gray-300 rounded px-3 py-2'
              placeholder='leia@rebellion.org'
            />
            {state.errors.email && <p className='text-sm text-red-600 mt-1'>{state.errors.email}</p>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='message'>
              Message
            </label>
            <textarea
              name='message'
              id='message'
              disabled={isPending}
              rows={4}
              defaultValue={state.input.message}
              className='w-full mt-1 border border-gray-300 rounded px-3 py-2'
              placeholder='Tell us how we can help...'
            />
            {state.errors.message && <p className='text-sm text-red-600 mt-1'>{state.errors.message}</p>}
          </div>
          <SubmitBtn />
        </form>
      </div>
    </main>
  );
}
