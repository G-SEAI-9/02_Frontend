import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.jsx';
import SubmitBtn from './components/SubmitBtn.jsx';
import { sleep, validate } from './utils/index.js';

// Stufe 3: Form Action + ErrorBoundary.
// Statt Fehler in einen State zu schreiben, *werfen* wir sie einfach.
// Die Action braucht keinen State mehr und kann deshalb außerhalb der Komponente stehen.
const formAction = async (formData) => {
  const data = Object.fromEntries(formData);
  const validationErrors = validate(data);
  // setErrors(validationErrors);

  // Ein Fehler, der in einer Form Action geworfen wird, landet bei der nächsten ErrorBoundary.
  // Alle Fehlermeldungen werden zu einem Text zusammengefügt (eine pro Zeile).
  if (Object.keys(validationErrors).length > 0) {
    throw new Error(Object.values(validationErrors).join('\n'));
  }

  await sleep(2000); // Simulate network delay
  console.log('Submitted:', data);
  alert('Form submitted successfully!');
};

// function Huch() {
//   return <h1>Huch!</h1>;
// }

export default function App() {
  return (
    <main className='min-h-screen bg-gray-900 p-8 font-sans'>
      <div className='max-w-xl mx-auto bg-gray-950 p-6 rounded-lg shadow space-y-6'>
        <h2 className='text-2xl font-bold text-center text-gray-200'>Contact Us</h2>
        {/*  */}
        {/* ErrorBoundary (Paket react-error-boundary) fängt Fehler aus allem, was darin liegt.
            Bei einem Fehler wird statt des Formulars die FallbackComponent angezeigt. */}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <form action={formAction} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-200' htmlFor='name'>
                Name
              </label>
              <input
                name='name'
                id='name'
                className='w-full mt-1 border border-gray-300 rounded px-3 py-2'
                placeholder='Leia Organa'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700' htmlFor='email'>
                Email
              </label>
              <input
                name='email'
                id='email'
                className='w-full mt-1 border border-gray-300 rounded px-3 py-2'
                placeholder='leia@rebellion.org'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700' htmlFor='message'>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                rows={4}
                className='w-full mt-1 border border-gray-300 rounded px-3 py-2'
                placeholder='Tell us how we can help...'
              />
            </div>
            <SubmitBtn />
          </form>
        </ErrorBoundary>
        {/*  */}
      </div>
    </main>
  );
}
