// Alle Props kommen als ein einzelnes Objekt an: { word: 'Hello', test: 42 }.
// Mit Destructuring { word, test } holen wir die Werte direkt als Variablen heraus.
function Greeting({ word, test }) {
  // console.log(word);

  // Normale JS-Variablen innerhalb der Komponente – nur hier sichtbar
  const greetingWord = 'Servus';
  const library = 'React';

  // Event-Handler: eine Funktion, die beim Klick ausgeführt wird
  const handleClick = () => console.log(`Geklickt! ${word}`);

  return (
    <h2>
      {/* Events in JSX sind camelCase (onClick statt onclick).
          Wir übergeben die Funktion selbst – ohne () –, sonst würde sie sofort beim Rendern laufen. */}
      <button type='button' onClick={handleClick}>
        {/* In { } darf jeder JS-Ausdruck stehen.
            ?? nimmt 'Hallo', falls word undefined ist (also kein Prop übergeben wurde). */}
        {word ?? 'Hallo'}, {library}
      </button>
    </h2>
  );
}

export default Greeting;
