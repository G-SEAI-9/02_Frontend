import { useState } from 'react';

function App() {
  // Erster Ansatz: ein eigener State pro Eingabefeld.
  // Einfach zu verstehen, wird aber bei vielen Feldern schnell unübersichtlich.
  // const [name, setName] = useState('Guybrush');
  // const [email, setEmail] = useState('mighty@pirate.gov');

  // Zweiter Ansatz (aktiv): ein einzelnes State-Objekt für das ganze Formular.
  // Die Schlüssel heißen genauso wie die name-Attribute der Inputs – das nutzen wir unten.
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  // Eigener State für die Fehlermeldung. Leerer String = kein Fehler.
  const [nameError, setNameError] = useState('');

  // Ein einziger Change-Handler für ALLE Felder.
  const handleInputChange = (e) => {
    // Herleitung Schritt für Schritt:
    // e.target ist das Input, in das gerade getippt wurde; e.target.name sagt uns, welches Feld es ist.
    // const field = e.target.name;
    // console.log({ field });
    // Neues Objekt bauen: alle alten Werte kopieren (...formState) und nur dieses eine Feld überschreiben.
    // [field] in eckigen Klammern heißt: Der Key ist der Inhalt der Variable field (z.B. 'email').
    // const newFormState = { ...formState, [field]: e.target.value };

    // Wichtig: Wir erzeugen ein neues Objekt statt formState direkt zu ändern.
    // React erkennt eine Änderung nur, wenn es ein neues Objekt bekommt.
    // setFormState(newFormState);

    // Kurzform (aktiv): dasselbe in einem Schritt, mit Updater-Funktion.
    // prev ist garantiert der aktuellste State. Die runden Klammern um {...}
    // sorgen dafür, dass die Arrow Function ein Objekt zurückgibt (und keinen Funktionsblock).
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function handleSubmit(e) {
    // wie immer:
    e.preventDefault();
    // Alle Formulardaten liegen bereits fertig im State – kein Auslesen der Inputs nötig.
    console.log(formState);
    // Eigene Validierung: Ist der Name leer, setzen wir eine Fehlermeldung in den State.
    if (!formState.name) {
      setNameError('Name is required');
    }
  }

  return (
    <>
      <h1>React: Form mit State</h1>
      <form onSubmit={handleSubmit} className='flex flex-col w-fit px-5 py-3 gap-5 border-2 rounded mx-auto my-7'>
        <div className='flex justify-between gap-2'>
          <label htmlFor='name'>Name</label>
          <input
            className='border rounded w-60 px-2 py-1'
            type='text'
            // name muss zum Schlüssel in formState passen, sonst schreibt handleInputChange ins falsche Feld
            name='name'
            id='name'
            // Erster Ansatz: eigener State + eigener Handler direkt am Input.
            // value={name}
            // onChange={(e) => {
            //   setName(e.target.value);
            // }}

            // "Controlled Input": Der angezeigte Wert kommt immer aus dem State,
            // und jede Eingabe läuft über onChange zurück in den State.
            value={formState.name}
            onChange={handleInputChange}
          />
          {/* Bedingtes Rendern: && zeigt das <p> nur, wenn nameError nicht leer ist */}
          {nameError && <p className='text-xs text-red-500'>{nameError}</p>}
        </div>
        <div className='flex justify-between gap-2'>
          <label htmlFor='email'>Email</label>
          <input
            className='border rounded w-60 px-2 py-1'
            // HTML-eigene Validierung immer noch möglich. Auskommentiert, damit unsere eigene Prüfung in handleSubmit sichtbar wird.
            // required
            type='email'
            name='email'
            id='email'
            // Erster Ansatz, hier als Einzeiler geschrieben:
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            //
            value={formState.email}
            onChange={handleInputChange}
          />
        </div>
        {/* Phone und Message nutzen denselben Handler – ein neues Feld braucht nur einen neuen Schlüssel in formState */}
        <div className='flex justify-between gap-2'>
          <label htmlFor='phone'>Phone</label>
          <input
            className='border rounded w-60 px-2 py-1'
            type='tel'
            name='phone'
            id='phone'
            value={formState.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex justify-between gap-2'>
          <label htmlFor='message'>Message</label>
          {/* In React bekommt auch <textarea> ein value-Attribut statt Text zwischen den Tags */}
          <textarea
            className='border rounded w-60 px-2 py-1 h-[5lh]'
            name='message'
            id='message'
            value={formState.message}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button
          className='border rounded shadow cursor-pointer px-5 py-2 self-center hover:text-white transition-colors'
          type='submit'
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
