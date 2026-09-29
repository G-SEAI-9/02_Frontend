import { useEffect, useState } from 'react';

function Effect() {
  const [count, setCount] = useState(0);
  const [myObj, setMyObj] = useState({
    test: 42,
  });
  const [todo, setTodo] = useState(null);
  const [screenWidth, setScreenWidth] = useState(null);

  // so nicht: fetch direkt im Komponenten-Body
  // Der Body läuft bei jedem Rendern -> fetch -> setTodo -> neues Rendern -> fetch -> ...
  // = Endlosschleife (infinite loop). Dasselbe passiert schon mit einem simplen setTodo({}),
  // weil {} jedes Mal ein neues Objekt ist.
  // fetch('https://dummyjson.com/todos/1')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log('DATA:', data);
  //     setTodo(data);
  //   });
  // setTodo({});

  // Effekte sind da, um React mit _externen_ Systemen zu synchronisieren
  // (Server per fetch, window-Events, Timer, ...).
  // Sie sind die "Hintertür" (escape hatch) aus der React-Welt:
  // Der Code im Effect läuft erst _nach_ dem Rendern, nicht währenddessen.

  // Anatomie: useEffect(Funktion, Dependency Array)
  //         Was?   , Wann?
  useEffect(() => {}, []);

  // - [] - leeres Array: einmaliges Ausführen beim mounten der Komponente
  // Deshalb gehört fetch hierher: setTodo löst zwar ein Rendern aus,
  // der Effect läuft danach aber nicht noch einmal -> keine Schleife.
  useEffect(() => {
    fetch('https://dummyjson.com/todos/random')
      .then((res) => res.json())
      .then((data) => {
        // console.log('DATA:', data);
        setTodo(data);
      });
  }, []);

  // - ohne Dependency Array: läuft _jedes_ Mal nach dem Rendern der Komponente
  // (selten)
  useEffect(() => {
    console.log('Läuft jedes Mal _nach_ einem Rendern');
  });

  // - mit Dependencies im Array: läuft einmal am Anfang
  // und dann immer, wenn sich die Dependencies verändert haben
  useEffect(() => {
    console.log('Feuert immer, wenn sich _count_ verändert hat', count);
  }, [count]);

  // Objekte und Arrays müssen immer durch neue ersetzt werden
  // ansonsten sieht React keine Veränderung
  // (React vergleicht die Referenz, nicht den Inhalt: altes Objekt === neues Objekt?)
  useEffect(() => {
    console.log('myObj ist jetzt das: ', myObj);
  }, [myObj]);

  // Beispiel mit einem externen System: dem Browser-Fenster (window)
  useEffect(() => {
    const handleResize = (e) => {
      console.log(e.target.innerWidth);
      setScreenWidth(e.target.innerWidth);
    };

    // Beim Mount: Listener am window anmelden
    window.addEventListener('resize', handleResize);

    // Startwert setzen, sonst steht bis zum ersten Resize nichts da
    setScreenWidth(window.innerWidth);

    // Effect Cleanup!
    // Die zurückgegebene Funktion ruft React beim Unmount auf
    // (und bevor der Effect erneut läuft). Ohne removeEventListener
    // bliebe der Listener am window hängen, auch wenn <Effect /> längst weg ist,
    // und jedes erneute Mounten würde einen weiteren Listener hinzufügen.
    // StrictMode (main.jsx) mountet absichtlich doppelt, damit genau das auffällt.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* ?. weil todo beim ersten Rendern noch null ist - der fetch kommt erst danach -> Optional Chaining */}
      <p>Todo: {todo?.todo}</p>

      <p>Der Screen ist {screenWidth}px breit.</p>

      <button
        type='button'
        onClick={() => {
          setCount((c) => c + 1);
          // Falsch: Objekt direkt verändern -> gleiche Referenz, der [myObj]-Effect feuert nicht
          // myObj.test = 'Hallo';
          // Feuert zwar (neues Objekt durch Spread), aber prev wird vorher verändert.
          // Den alten State nie mutieren - besser: return { ...prev, test: '...' };
          // setMyObj((prev) => {
          //   prev.test = 'Falsch aus der updater funktion';
          //   return { ...prev };
          // });
          // Richtig: ein neues Objekt übergeben
          setMyObj({ test: 'hello' });
        }}
      >
        Count {count}
      </button>
    </>
  );
}

export default Effect;
