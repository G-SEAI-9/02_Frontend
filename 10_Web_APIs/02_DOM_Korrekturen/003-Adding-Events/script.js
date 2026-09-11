// Array of 10 random tasks as strings
const tasks = [
  'Complete the project',
  'Attend the meeting',
  'Write a report',
  'Review the Code',
  'Fix the bugs',
  'Update the documentation',
  'Plan the next sprint',
  'Conduct user testing',
  'Optimize the performance',
  'Design',
];

// Hilfsfunktion: sucht eine zufällige Aufgabe aus dem Array.
// Math.random() liefert eine Kommazahl zwischen 0 und 1,
// mal tasks.length und abgerundet ergibt das einen gültigen Index (0-9).
function getRandomTask() {
  const randomIndex = Math.floor(Math.random() * tasks.length);
  return tasks[randomIndex];
}

// ============================================================
//   **JavaScript Tasks**:
//     *   Attach an event to the first button to create a new
//       `li` in the `ul` with a random task from the provided array.
//     *   Make sure you scroll to the last task so
//       the last one is always visible!
// ============================================================

// Schritt 1: Das Element aus dem HTML holen
const alertBtn = document.getElementById('alert-btn');

// Schritt 2: Die Funktion definieren, die beim Klick laufen soll.
// Eine solche Funktion nennt man "Callback" oder "Event Handler" —
// wir rufen sie nicht selbst auf, der Browser ruft sie für uns auf.
function schreiUmHilfe() {
  alert('HILFE!');
}

// schreiUmHilfe();

// Schritt 3: Listener anhängen. addEventListener bekommt zwei Dinge:
//   1. den Namen des Events als String ('click', 'input', 'submit', ...)
//   2. die Funktion, die dann laufen soll
// wichtig: schreiUmHilfe _ohne_ Klammern übergeben. Mit Klammern würden wir
// die Funktion sofort ausführen und ihr Ergebnis (undefined) übergeben.
alertBtn.addEventListener('click', schreiUmHilfe);

//

// Dasselbe kompakter: Element holen und Listener in einer Zeile verketten.
// Statt einer benannten Funktion übergeben wir hier direkt eine Arrow Function.
// Praktisch, wenn der Handler nur an dieser einen Stelle gebraucht wird.
document.getElementById('console-btn').addEventListener('click', () => {
  console.log(getRandomTask());
});

//
const listEl = document.getElementById('item-list');
const addItemBtn = document.getElementById('add-item-btn');
// console.log(addItemBtn);

// Bei jedem Klick auf "Add Item" wird eine neue Aufgabe in die Liste gehängt.
addItemBtn.addEventListener('click', () => {
  const randomText = getRandomTask();

  // Variante A (imperativ): das <li> Schritt für Schritt im JS bauen.
  // Mehr Zeilen, dafür hat man das Element als Variable zur Verfügung und
  // kann ihm z.B. direkt einen eigenen Event Listener geben.
  // const newLi = document.createElement('li');
  // newLi.textContent = randomText;

  // listEl.appendChild(newLi);
  // listEl.lastChild.scrollIntoView();

  // newLi.addEventListener('click', () => {
  //   newLi.remove();
  // });

  // Variante B: das fertige HTML als Template String schreiben.
  // ${randomText} setzt den Wert der Variablen an dieser Stelle ein.
  const listHTML = `
   <li style="view-transition-name: match-element" class="font-semibold p-3 my-1 border shadow rounded-2xl">
      <span>Task: ${randomText}
      </span>
  </li>`;

  // insertAdjacentHTML('beforeend', ...) hängt das HTML ans Ende der Liste an,
  // ohne die schon vorhandenen <li> neu zu erzeugen.
  listEl.insertAdjacentHTML('beforeend', listHTML);
  // Nach oben/unten scrollen, damit der neue Eintrag sichtbar wird.
  listEl.lastChild.scrollIntoView();
});

// ============================================================
// Event Delegation
// ============================================================

// Statt jedem <li> einen eigenen Listener zuzuweisen, lauscht
// nur die übergeordnete <ul>. Klick-Events der Kinder "blubbeln"
// (bubbling) nach oben – dieses Muster heißt Event Delegation.
// Vorteil: Weniger Listener und
// funktioniert auch für <li>-Elemente, die erst per JS hinzugefügt werden.
listEl.addEventListener('click', (event) => {
  // Das event-Objekt bekommt der Handler automatisch vom Browser.
  // event.target ist das Element, das TATSÄCHLICH geklickt wurde —
  // also evtl. das <span> im <li>, nicht das <li> selbst.
  console.log(event.target);
  // Deshalb reicht ein simpler Tag-Vergleich hier nicht zuverlässig:
  // if (event.target.tagName === 'LI') {
  //   event.target.remove();
  // }

  // closest() sucht vom geklickten Element aufwärts nach einem <li>.
  // Nötig, weil der Klick auch auf ein Kind-Element (z. B. <span>)
  // landen kann – nicht direkt auf dem <li> selbst.
  const clickedEl = event.target.closest('li');

  // Guard Clause: Klick außerhalb eines <li> → nichts tun.
  if (!clickedEl) {
    return;
  }

  // View Transitions API: Änderungen am DOM, die innerhalb des
  // Callbacks passieren, werden vom Browser automatisch animiert.
  // Browserunterstützung prüfen: https://caniuse.com/view-transitions
  document.startViewTransition(() => {
    clickedEl.remove();
  });
});
