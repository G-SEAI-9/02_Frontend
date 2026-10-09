import { sleep, validate } from '../utils/index.js';

// Startwert für useActionState: leere Eingaben, keine Fehler.
// Jeder Rückgabewert der Action muss diese Form haben, damit App.jsx ihn lesen kann.
export const initialState = {
  input: {
    name: '',
    email: '',
    message: '',
  },
  errors: {
    name: '',
    email: '',
    message: '',
  },
};

// Mit useActionState bekommt die Action zwei Argumente:
// den vorherigen State (hier nicht gebraucht, daher _prevState) und das FormData Objekt.
// Die Action kann in einer eigenen Datei liegen. Sie ist eine reine Funktion ohne React-Hooks.
const action = async (_prevState, formData) => {
  const data = Object.fromEntries(formData);
  const validationErrors = validate(data);
  console.log({ data });

  if (Object.keys(validationErrors).length === 0) {
    await sleep(2000); // Simulate network delay
    console.log('Submitted:', data);
    alert('Form submitted successfully!');

    // Erfolg: zurück zum leeren Formular
    return initialState;
  }

  // Fehler: Eingaben und Fehlermeldungen zurückgeben – das wird der neue state in App.jsx
  return {
    input: data,
    errors: validationErrors,
  };
};

export default action;
