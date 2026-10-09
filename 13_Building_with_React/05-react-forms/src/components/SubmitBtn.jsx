import { useFormStatus } from 'react-dom';

// Achtung: useFormStatus kommt aus 'react-dom', nicht aus 'react'
export default function SubmitBtn() {
  // useFormStatus liefert den Status des umgebenden <form>.
  // pending ist true, solange dessen Action läuft – ganz ohne eigenen loading-State.
  // Funktioniert nur in einer Komponente *innerhalb* des <form>, deshalb der eigene SubmitBtn.
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className={`w-full py-2 rounded text-white ${
        pending ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {pending ? 'Sending message...' : 'Send Message'}
    </button>
  );
}
