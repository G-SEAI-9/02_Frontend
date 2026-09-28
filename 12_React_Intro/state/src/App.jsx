// useState ist ein "Hook": eine Funktion von React, die mit "use" beginnt
// und unserer Komponente Zusatzfähigkeiten gibt
import { useState } from 'react';
import CatName from './components/CatName.jsx';

function App() {
  // ❌ Versuch 1: eine normale Variable.
  // Wir können sie zwar überschreiben (count = 11), aber die UI ändert sich nicht.
  // Die Anzeige entsteht nur, wenn React die funktionale Komponente (hier App()) neu ausführt.
  // Eine geänderte Variable löst keine neue Ausführung (kein "Rerender") aus –
  // und beim nächsten Aufruf von App() würde sie ohnehin wieder bei 10 starten.
  // let count = 10;

  // useState gibt immer ein Array mit genau zwei Einträgen zurück:
  // [aktueller Wert, Setter-Funktion zum Ändern des Werts]
  // const state = useState(0); // -> [0, ƒ]

  // ✅ Deshalb schreibt man es fast immer mit Array-Destructuring.
  // - count:    der aktuelle Wert (beim allerersten Rendern: 0)
  // - setCount: ruft man ihn mit einem neuen Wert auf, merkt React sich den Wert
  // und führt App() erneut aus → die UI zeigt den neuen Wert.
  // Anders als eine normale Variable überlebt count das Neu-Ausführen von App().
  const [count, setCount] = useState(0);

  // State muss kein primitiver Wert sein – auch Objekte (und Arrays) gehen.
  // Hier fassen wir alle Werte des Formulars in einem Objekt zusammen.
  const [formState, setFormState] = useState({
    color: '#000',
    name: 'Guybrush',
    show: true,
  });

  // ❌ Den Setter niemals direkt im Komponenten-Körper aufrufen
  // setCount → Rerender → App() läuft erneut → setCount → Rerender → ...
  // Das ergibt eine Endlosschleife (React bricht mit "Too many re-renders" ab).
  // setCount((c) => c + 1); // App()

  // ❌ Hooks dürfen nicht in if-Blöcken, Schleifen oder verschachtelten Funktionen stehen.
  // React erkennt die einzelnen useState-Aufrufe nur an ihrer Reihenfolge.
  // Wird ein Hook mal aufgerufen und mal nicht, gerät diese Reihenfolge durcheinander.
  // Regel: Hooks immer ganz oben in der Komponente, bei jedem Rendern gleich.
  // let today = 'Monday'; // nicht erlaubt
  // if (today === 'Tuesday') {
  //   const [count, setCount] = useState(0);
  // }

  const handleClick = () => {
    // Updater-Funktion: Statt eines Werts übergeben wir dem Setter eine Funktion.
    // React ruft sie mit dem jeweils aktuellsten State auf (vorherigerState)
    // und nimmt den Rückgabewert als neuen State.
    //
    // Warum nicht einfach setCount(count + 1) viermal?
    // count ist innerhalb dieses Renderdurchlaufs fest (z.B. 0).
    // Viermal setCount(0 + 1) ergibt also 1, nicht 4.
    // console.log('setter 1');
    setCount((vorherigerState) => {
      return vorherigerState + 1;
    });
    // Kurzschreibweise derselben Updater-Funktion.
    // Jeder Aufruf bekommt das Ergebnis des vorherigen – so kommen wir auf +4.
    // console.log('setter 2');
    setCount((c) => c + 1);
    // console.log('setter 3');
    setCount((c) => c + 1);
    // console.log('setter 4');
    setCount((c) => c + 1);

    // Batching: Obwohl wir den Setter viermal aufrufen, rendert React nur einmal.
    // React sammelt alle State-Änderungen eines Event-Handlers und
    // rendert erst danach neu – das spart unnötige Arbeit.
  };

  // Dieses console.log läuft bei jedem Rendern. So sehen wir in der Konsole,
  // dass App() nach jeder State-Änderung tatsächlich neu ausgeführt wird.
  console.log(formState);

  return (
    // Die Hintergrundfarbe kommt direkt aus dem State:
    // ändert sich formState.color, rendert React neu und die Farbe wechselt.
    <div
      style={{
        backgroundColor: formState.color,
      }}
    >
      <button onClick={handleClick} type='button'>
        Count++
      </button>
      <p>
        Current count <span>{count}</span>
      </p>

      {/* CatName verwaltet ihren eigenen State (catName) selbst.
          App weiß davon nichts – und muss es auch nicht.
          Faustregel: State lebt in der Komponente, die ihn braucht. */}
      <CatName />

      <form>
        <br />
        <label>
          Pick a color
          {/* "Controlled Input": value kommt aus dem State,
              onChange schreibt jede Änderung zurück in den State.
              So ist der State die einzige "Quelle der Wahrheit". */}
          <input
            type='color'
            value={formState.color}
            onChange={(e) => {
              // Bei Objekten muss der Setter ein *neues* Objekt bekommen.
              // { ...f } kopiert alle bisherigen Felder (name, show),
              // danach überschreiben wir nur color.
              // Ohne den Spread wären name und show danach weg!
              setFormState((f) => {
                return { ...f, color: e.target.value };
              });
            }}
          />
        </label>
        <br />
        <label>
          Name: {formState.name}
          <input
            type='text'
            value={formState.name}
            onChange={(e) => {
              setFormState((f) => {
                return { ...f, name: e.target.value };
              });
              // ❌ So funktioniert es NICHT: Das Objekt direkt verändern (mutieren).
              // React vergleicht alten und neuen State nur per Referenz (===).
              // Ist es noch dasselbe Objekt, sieht React "keine Änderung"
              // und rendert nicht neu. Außerdem gibt die Funktion hier nichts
              // zurück – der State wäre danach undefined.
              // setFormState(() => {
              //   formState.name = e.target.value;
              // });
            }}
          />
        </label>
        <br />
        <label>
          Show
          <input
            type='checkbox'
            checked={formState.show}
            onChange={(e) => {
              // Bei Checkboxen steht der Wert in e.target.checked (true/false),
              // nicht in e.target.value.
              setFormState((f) => {
                console.log(e.target.checked);
                return { ...f, show: e.target.checked };
              });
            }}
          />
        </label>
      </form>

      {/* Bedingtes Rendern: Ist formState.show true, wird die Überschrift angezeigt,
          bei false rendert React an dieser Stelle nichts. */}
      {formState.show && <h2>Konditional Gerendered</h2>}
    </div>
  );
}

export default App;
