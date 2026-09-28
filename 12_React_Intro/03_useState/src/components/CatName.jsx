import { useState } from 'react';

export default function CatName() {
  // Diese Komponente hat ihren eigenen, unabhängigen State.
  // Jede <CatName /> auf der Seite bekommt ihr eigenes catName –
  // und ein Rerender hier betrifft nur diese Komponente, nicht App.
  // Diesmal ein String als Startwert: State kann jeder beliebige Wert sein.
  const [catName, setCatName] = useState('Neela');

  return (
    <div>
      {/* Controlled Input: Bei jedem Tastendruck landet der neue Text im State,
          React rendert neu und der <p> darunter zeigt sofort den neuen Namen. */}
      <input
        type='text'
        onChange={(e) => {
          // Bei primitiven Werten (String, Zahl, Boolean) reicht es,
          // einfach den neuen Wert zu übergeben – kein Kopieren nötig.
          setCatName(e.target.value);
        }}
        value={catName}
      />
      <p>{catName}</p>
    </div>
  );
}
