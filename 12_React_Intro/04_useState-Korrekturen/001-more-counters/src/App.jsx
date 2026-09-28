import { useState } from 'react';
import Counter from './components/Counter.jsx';
import Counter2 from './components/Counter2.jsx';
import Header from './components/Header.jsx';

function App() {
  // Dieser State lebt in App, also "oben" im Komponentenbaum.
  // So können mehrere Kinder (Header und Counter2) denselben Wert nutzen.
  // Man nennt das "State Lifting": State wandert in die nächste gemeinsame Elternkomponente.
  const [count, setCount] = useState(0);
  return (
    <>
      {/* Header bekommt nur den Wert zum Anzeigen, er darf ihn nicht ändern */}
      <Header count={count} />
      <div>
        {/* Jede <Counter />-Instanz hat ihren eigenen State.
            Klickt man bei einem Counter auf +, ändern sich die anderen nicht. */}
        <Counter />
        <Counter />
        <Counter />
      </div>
      <div className='my-5'>
        <h2>Counter2!</h2>
        {/* Counter2 hat keinen eigenen State: Er bekommt Wert und Setter als Props.
            Ändert Counter2 den Wert, rendert App neu und der Header zeigt die neue Zahl. */}
        <Counter2 count={count} setCount={setCount} />
      </div>
    </>
  );
}

export default App;
