import { useState } from 'react';
import SubmitBtn from './components/SubmitBtn.jsx';
import { sleep, validate } from './utils/index.js';

// Stufe 2: React 19 Form Action, einfache Variante.
// Die Inputs sind jetzt "unkontrolliert": der Browser hält die Werte, nicht React.
// Kein onChange, kein preventDefault, kein loading-State mehr nötig.
export default function App() {
  // hätten wir her noch weiter nutzen können...
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Eine Action bekommt beim Absenden automatisch ein FormData-Objekt mit allen Feldern.
  // Die Werte werden über das name-Attribut der Inputs zugeordnet.
  const formAction = async (formData) => {
    // FormData → normales Objekt: { name: '...', email: '...', message: '...' }
    const data = Object.fromEntries(formData);
    const validationErrors = validate(data);

    if (Object.keys(validationErrors).length === 0) {
      await sleep(2000); // Simulate network delay
      console.log('Submitted:', data);
      alert('Form submitted successfully!');
    }
  };

  return (
    <main className='min-h-screen bg-gray-900 p-8 font-sans'>
      <div className='max-w-xl mx-auto bg-gray-950 p-6 rounded-lg shadow space-y-6'>
        <h2 className='text-2xl font-bold text-center text-gray-200'>Contact Us</h2>
        {/* action statt onSubmit: React ruft formAction auf und setzt das Formular danach automatisch zurück */}
        <form action={formAction} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-200' htmlFor='name'>
              Name
            </label>
            {/* defaultValue = nur der Startwert; danach verwaltet der Browser den Wert selbst */}
            <input
              name='name'
              id='name'
              defaultValue={formData.name}
              className='w-full mt-1 border border-gray-300 rounded px-3 py-2'
              placeholder='Leia Organa'
            />
            {errors.name && <p className='text-sm text-red-600 mt-1'>{errors.name}</p>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='email'>
              Email
            </label>
            <input
              name='email'
              id='email'
              defaultValue={formData.email}
              className='w-full mt-1 border border-gray-300 rounded px-3 py-2'
              placeholder='leia@rebellion.org'
            />
            {errors.email && <p className='text-sm text-red-600 mt-1'>{errors.email}</p>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='message'>
              Message
            </label>
            <textarea
              name='message'
              id='message'
              rows={4}
              defaultValue={formData.message}
              className='w-full mt-1 border border-gray-300 rounded px-3 py-2'
              placeholder='Tell us how we can help...'
            />
            {errors.message && <p className='text-sm text-red-600 mt-1'>{errors.message}</p>}
          </div>
          {/* Ladezustand kommt jetzt aus useFormStatus im SubmitBtn – siehe components/SubmitBtn.jsx */}
          <SubmitBtn />
        </form>
      </div>
    </main>
  );
}
