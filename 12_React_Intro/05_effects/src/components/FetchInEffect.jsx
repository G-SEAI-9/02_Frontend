import { useEffect, useState } from 'react';
import Loading from './Loading.jsx';

// Vorlage für späteres Fetchen: Daten, Fehler und Ladezustand als eigener State
export default function FetchInEffect() {
  const [todos, setTodos] = useState([]);
  const [err, setErr] = useState(false);
  // true, weil der fetch sofort nach dem ersten Rendern startet
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mit einem AbortController können wir einen laufenden fetch abbrechen
    const controller = new AbortController();

    // Die Effect-Funktion selbst darf nicht async sein (sie darf nur eine
    // Cleanup-Funktion zurückgeben, kein Promise) - daher eine async-Funktion darin
    async function fetchData() {
      try {
        // signal verbindet den fetch mit dem Controller
        const res = await fetch('https://dummyjson.com/todos', {
          signal: controller.signal,
        });
        // fetch wirft bei 400/500 keinen Fehler - das müssen wir selbst prüfen
        if (!res.ok) {
          throw new Error('Fetch failed');
        }
        const data = await res.json();
        setTodos(data.todos);
      } catch (error) {
        console.log('ERROR: ', error);
        // Ein Abbruch durch unser Cleanup ist kein echter Fehler -> nicht anzeigen
        if (!controller.signal.aborted) setErr(error.message);
      } finally {
        // finally läuft immer, egal ob Erfolg oder Fehler
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchData();

    // Cleanup: Wird die Komponente unmounted, bevor die Antwort da ist,
    // brechen wir den fetch ab. Im StrictMode sieht man das: der erste
    // fetch wird abgebrochen, der zweite liefert die Daten.
    return () => controller.abort();
  }, []);

  return (
    <div>
      <h2>Fetch in Effect</h2>

      {/* Je nach State zeigen wir Ladeanimation, Fehler oder Daten */}
      {loading && <Loading />}
      {err && <p>Ein Fehler trat auf: "{err}" Versuche es nachher nochmal.</p>}
      {todos.map((t) => (
        <article key={t.id}>
          <h2>
            {t.todo} <span>{t.completed ? '✅' : '❌'}</span>
          </h2>
        </article>
      ))}
    </div>
  );
}
