/** biome-ignore-all lint/correctness/useUniqueElementIds: <not now> */
import { useState } from 'react';
import { sleep, validate } from './utils/index.js';

// Stufe 1: Klassisches, kontrolliertes Formular.
// React hält jeden Feldwert im State – das Input zeigt immer genau das an, was im State steht.
// Alles (Werte, Ladezustand, Fehler) verwalten wir selbst mit useState.
export default function App() {
  // Ein State-Objekt für alle Felder – die Keys entsprechen den name-Attributen der Inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  // Eigener State, um während des Absendens Felder und Button zu sperren
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Wird bei jedem Tastendruck aufgerufen (→ ein Re-Render pro Zeichen).
  // [e.target.name] ist ein "computed key": derselbe Handler funktioniert für alle Felder.
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    // Verhindert das Standardverhalten des Browsers (Seite neu laden)
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    // Leeres Fehler-Objekt = alles gültig
    if (Object.keys(validationErrors).length === 0) {
      await sleep(2000); // Simulate network delay
      console.log('Submitted:', formData);
      alert('Form submitted successfully!');
      // Formular zurücksetzen müssen wir hier von Hand erledigen
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    }
    setLoading(false);
  };

  return (
    <main className='min-h-screen bg-gray-900 p-8 font-sans'>
      <div className='max-w-xl mx-auto bg-gray-950 p-6 rounded-lg shadow space-y-6'>
        <h2 className='text-2xl font-bold text-center text-gray-200'>Contact Us</h2>
        {/* Klassisch: onSubmit + eigener Handler (vgl. später action={...}) */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-200' htmlFor='name'>
              Name
            </label>
            {/* "Kontrolliert" = value kommt aus dem State, onChange schreibt zurück in den State */}
            <input
              name='name'
              id='name'
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className='w-full mt-1 border border-gray-300 rounded px-3 py-2'
              placeholder='Leia Organa'
            />
            {/* Fehlermeldung nur anzeigen, wenn es für dieses Feld einen Fehler gibt */}
            {errors.name && <p className='text-sm text-red-600 mt-1'>{errors.name}</p>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='email'>
              Email
            </label>
            <input
              name='email'
              id='email'
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
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
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              className='w-full mt-1 border border-gray-300 rounded px-3 py-2'
              placeholder='Tell us how we can help...'
            />
            {errors.message && <p className='text-sm text-red-600 mt-1'>{errors.message}</p>}
          </div>
          {/* Der Button liest den Ladezustand direkt aus unserem eigenen loading-State */}
          <button
            type='submit'
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Sending message...' : 'Send Message'}
          </button>
        </form>
      </div>
    </main>
  );
}
