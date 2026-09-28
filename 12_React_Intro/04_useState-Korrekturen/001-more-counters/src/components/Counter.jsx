import { useState } from 'react';

export default function Counter() {
  // Lokaler State: Jede Counter-Instanz bekommt beim ersten Rendern ihren eigenen count (Startwert 0).
  // count = aktueller Wert, setCount = Funktion, mit der wir React einen neuen Wert mitteilen.
  const [count, setCount] = useState(0);

  return (
    <div className='text-3xl'>
      <h2>Counter</h2>

      {/* Variante 1 – Updater-Funktion: React übergibt uns den aktuellsten Wert (c).
          Das ist die sichere Variante, wenn der neue Wert vom alten abhängt. */}
      <button className='px-4 cursor-pointer' type='button' onClick={() => setCount((c) => c - 1)}>
        -
      </button>

      {/* Nach jedem setCount rendert React die Komponente neu und zeigt hier den neuen Wert */}
      <span>{count}</span>

      {/* Variante 2 – direkter Wert: count ist der Wert aus diesem Render.
          Funktioniert hier genauso, kann aber bei mehreren Updates hintereinander veraltet sein. */}
      <button className='px-4 cursor-pointer' type='button' onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
}

// Alternative Schreibweise derselben Komponente als Arrow Function.
// Dann geht der Export nicht direkt vor der Funktion, sondern als eigene Zeile am Ende:

// const Counter = () => {}

// export default Counter
