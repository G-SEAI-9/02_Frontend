// ============================================================
// Die DOM API
// ============================================================

// 'document' ist der Einstiegspunkt ins DOM: der ganze HTML-Baum als JS-Objekt
console.log(document);

// Über 'document' kommen wir an jeden Teil der Seite, z.B. an <body>
console.log(document.body);

// Mit JS können wir alle Attribute eines Elements auslesen und verändern
// z.B. die backgroundColor im Styling
document.body.style.backgroundColor = 'red';

// querySelector nimmt einen CSS-Selektor und gibt das erste passende Element zurück
console.log(document.querySelector('.cursor-pointer.py-2.px-3.w-fit'));

// '#herbert' = "das Element mit der id herbert" (gleiche Selektor-Syntax wie in CSS)
// console.log(document.querySelector('#herbert'));

// getElementById macht dasselbe, erwartet aber nur die id – ohne '#'
console.log(document.getElementById('herbert'));

// const legendEl = document.querySelector('legend');

// console.log zeigt das Element wie HTML, console.dir zeigt es als JS-Objekt mit allen Eigenschaften
// // console.dir(legendEl);

// textContent liest bzw. überschreibt den reinen Text eines Elements
// legendEl.textContent = 'Hallo, Leute! Willkommen zum Zahlenratespiel!';

// Einzelne CSS-Eigenschaft setzen (in JS camelCase: fontSize statt font-size)
// legendEl.style.fontSize = '14px';

// classList ist der saubere Weg, CSS-Klassen zu setzen, statt style zu überschreiben
// legendEl.classList.add('font-bold', 'text-red-500', 'my-label');
// legendEl.classList.remove('my-label');

// ============================================================
// Mehrere Elemente auf einmal auswählen (selten gebraucht)
// ============================================================

// querySelectorAll gibt eine NodeList zurück: eine Momentaufnahme, die sich
// nicht mehr ändert – dafür kann man forEach direkt darauf anwenden
const nodeList = document.querySelectorAll('div');

// getElementsByTagName gibt eine HTMLCollection zurück: die ist "live",
// wächst automatisch mit, wenn später neue <div> dazukommen
const htmlCollection = document.getElementsByTagName('div');

// ============================================================
// Elemente erstellen
// ============================================================

// 1. Erstellen – das Element existiert jetzt nur im Speicher, noch nicht auf der Seite
const newDiv = document.createElement('div');
// 2. Konfigurieren – Text, Klassen, Attribute setzen
newDiv.textContent = 'Die neue DIV';
// 3. in Seite hängen – erst appendChild macht es sichtbar
document.body.appendChild(newDiv);

// console.log(newDiv);

// Dasselbe Muster in einer Schleife: 101 <option>-Einträge für die Autovervollständigung
// des Zahlenfelds erzeugen, statt sie alle von Hand ins HTML zu schreiben
const dataListEl = document.getElementById('possible-numbers');

for (let i = 0; i <= 100; i++) {
  const newOption = document.createElement('option');
  newOption.value = i;
  dataListEl.appendChild(newOption);
}

// ============================================================
// Auf Events reagieren
// ============================================================

const resultEl = document.getElementById('result');

// Die Funktion wird hier nur definiert, nicht aufgerufen
function handleClick() {
  console.log('geklickt');
}

addEventListener('click', handleClick); // der Browser ruft handleClick auf, sobald geklickt wird.
// Wichtig: handleClick OHNE Klammern übergeben – sonst würde das Ergebnis
// des sofortigen Aufrufs übergeben statt der Funktion selbst.
resultEl.addEventListener('click', handleClick);

// Man kann beliebig viele Listener für dasselbe Ereignis registrieren –
// dieser hier läuft zusätzlich zu handleClick
resultEl.addEventListener('click', () => {
  // toggle: Klasse hinzufügen, wenn sie fehlt – sonst entfernen
  resultEl.classList.toggle('text-green-700');
  resultEl.textContent += '?';
});

// Ältere Variante: überschreibt einen evtl. schon vorhandenen Handler,
// deshalb ist addEventListener heute der Standard
// resultEl.onclick = () => {}

//
// zufällige Zahl auswählen
// Math.random() liefert 0 bis knapp unter 1 – mal 101 und abgerundet ergibt 0 bis 100
const numberToGuess = Math.floor(Math.random() * 101);
console.log(numberToGuess);

// Formularevent abfangen
const formEl = document.querySelector('form');
const myInputEl = document.getElementById('number-input');

// 'submit' feuert beim Klick auf den Submit-Button und bei Enter im Eingabefeld
formEl.addEventListener('submit', (event) => {
  // Standardverhalten des Browsers (Seite neu laden) unterdrücken –
  // sonst wäre unser JS-Zustand nach jedem Rateversuch weg
  event.preventDefault();

  // Nutzereingabe auslesen – drei von vielen Wegen zum selben Wert:
  // über die Kinder-Elemente hangeln (fragil: bricht bei jeder HTML-Änderung)
  // console.log(event.target.children[0].children[2].value);
  // über die elements-Sammlung des Formulars, per name-Attribut
  // console.log(event.target.elements['number-input'].value);
  // per Selektor innerhalb des Formulars
  // console.log(event.target.querySelector('#number-input').value);
  // mit vorher selektiertem Inputelement. Bei wenigen Inputs am praktischsten.
  const userInput = myInputEl.value;

  // Nutzereingabe ableichen
  // Achtung: .value ist immer ein String, auch bei <input type="number">
  console.log(numberToGuess, typeof numberToGuess);
  console.log(userInput, typeof userInput);

  // Deshalb erst in eine echte Zahl umwandeln (10 = Dezimalsystem),
  // damit die Vergleiche unten korrekt funktionieren
  const userNumber = parseInt(userInput, 10);

  if (userNumber === numberToGuess) {
    console.log('GEWONNEN!');
  } else {
    console.log('Nicht gleich');
  }

  // Rückmeldung geben – return bricht die Funktion ab,
  // damit der Gewinn-Code unten nicht auch noch läuft
  if (userNumber < numberToGuess) {
    resultEl.textContent = `${userInput} ist zu klein`;
    return;
  }
  if (userNumber > numberToGuess) {
    resultEl.textContent = `${userInput} ist zu groß`;
    return;
  }

  resultEl.textContent = 'Richtig!';

  // Gewinn-Toast: wieder das Muster erstellen -> konfigurieren -> einhängen
  const toast = document.createElement('div');
  toast.classList.add(
    'border-4',
    'p-4',
    'border-b-green-600',
    'rounded',
    'shadow',
    'bg-indigo-950',
    'text-white',
    'toast-card',
  );
  toast.textContent = `🎉 Du hast gewonnen! 🎉`;

  document.getElementById('toast-container').appendChild(toast);

  // Nach 2 Sekunden entfernt sich das Element wieder selbst aus dem DOM
  setTimeout(() => {
    toast.remove();
  }, 2000);
});
