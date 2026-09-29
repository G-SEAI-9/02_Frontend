import { useState } from 'react';
import Effect from './components/Effect.jsx';
import FetchInEffect from './components/FetchInEffect.jsx';

function App() {
  // toggle steuert, ob <Effect /> angezeigt wird
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <h1>React: useEffect</h1>
      <label>
        <input type='checkbox' checked={toggle} onChange={() => setToggle((t) => !t)} /> anzeigen
      </label>
      {/* Mounting / Unmounting:
          toggle wird true  -> <Effect /> wird erzeugt und ins DOM eingefügt (mount)
          toggle wird false -> <Effect /> wird komplett entfernt (unmount), sein State ist weg
          Beim Unmount laufen die Cleanup-Funktionen der Effects in <Effect /> */}
      {toggle && <Effect />}

      {/* Vollständigeres Fetch-Beispiel: Loading, Fehler, Abbrechen per Cleanup */}
      <FetchInEffect />
    </>
  );
}

export default App;
