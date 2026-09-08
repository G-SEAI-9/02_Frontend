// =========================================================
//  JavaScript Arrays II
//  Funktionen höherer Ordnung & die wichtigsten Arraymethoden
//  map, filter, find, some, every, reduce
// =========================================================

// Wie können wir jede Zahl in numbers quadrieren ohne
// das ursprüngliche Array zu überschreiben?
const numbers = [1, 2, 3, 4, 5, 6, 7];
const squaredNums = [];

for (const num of numbers) {
  squaredNums.push(num * num);
}

console.log(squaredNums);

function squareNumber(num) {
  return num * num;
}

// Hier passiert das Neue: Wir übergeben die Funktion selbst an .map() -
// ohne Klammern! squareNumber() würde die Funktion aufrufen,
// squareNumber übergibt sie als Wert. map ruft sie dann für jedes
// Element einmal auf und sammelt die Rückgabewerte in einem neuen Array.
const newArrayOdSquaredNums = numbers.map(squareNumber);

// console.log(newArrayOdSquaredNums);

// ---------------------------------------------------------
// 1. Funktionen höherer Ordnung
// ---------------------------------------------------------

// In JS sind Funktionen ganz normale Werte. Man kann sie in Variablen
// speichern, an andere Funktionen übergeben und aus Funktionen zurückgeben.
// Eine Funktion, die das tut, nennt man "Funktion höherer Ordnung".

// Variante A: eine Funktion nimmt eine andere Funktion als Parameter entgegen.
// someFn ist hier nur ein Parametername - darin steckt später simpleFn.

function myHigherOrderFn(someFn, number) {
  console.log('Hallo aus der Fn höherer Ordnung');

  someFn(number);
}

function simpleFn(num) {
  console.log(num + 5);
  console.log('Aus der einfachen Funktion!');
}

// Beim Aufruf wird simpleFn ohne Klammern übergeben: nicht das Ergebnis,
// sondern die Funktion selbst. myHigherOrderFn entscheidet, wann sie läuft.
myHigherOrderFn(simpleFn, 10);

// //
// Variante B: eine Funktion gibt eine Funktion zurück.

function adder(num) {
  console.log("Hallo aus 'adder'");

  return function () {
    console.log('Hallo aus zurückgegebenen Funktion');
    return num + 10;
  };
}

// adder(5) läuft einmal durch und gibt die innere Funktion zurück -
// noch ohne sie auszuführen. In zurückgegebeneFn steckt jetzt eine Funktion.
const zurückgegebeneFn = adder(5);

// Erst dieser zweite Aufruf führt die innere Funktion aus. Bemerkenswert:
// sie kennt num (=5) immer noch, obwohl adder längst fertig ist (das wird Closure genannt).
const wertAusInnererFn = zurückgegebeneFn();
console.log(wertAusInnererFn);

// ---------------------------------------------------------
// 2. map() selbst nachbauen
// ---------------------------------------------------------

const zahlen = [1, 2, 3, 4, 5, 9];

// transformationsFn ist die Funktion, die von außen hereingereicht wird -
// transformArray weiß gar nicht, was sie tut,
// oder wie arr genau aussieht und muss es auch nicht wissen.
function transformArray(arr, transformationsFn) {
  const out = [];

  for (const value of arr) {
    const newVal = transformationsFn(value);
    out.push(newVal);
  }
  return out;
}

// Erste Variante unserer transformationsFn
function double(num) {
  return num + num;
}

// Arrow Function ohne geschweifte Klammern: der Ausdruck hinter dem Pfeil
// wird automatisch zurückgegeben, ein return ist hier nicht nötig.
const doubledArrow = (num) => num + num;

// Alle vier Zeilen liefern exakt dasselbe Ergebnis.
// Die letzte ist die Schreibweise, die man in der Praxis am häufigsten sieht:
// die Funktion wird direkt an Ort und Stelle geschrieben, ohne eigenen Namen.
// const doubled = transformArray(zahlen, double);
// const doubled = zahlen.map(double);
// const doubled = zahlen.map(doubledArrow);
const doubled = zahlen.map((num) => num + num);

// map verändert das Original nie - zahlen ist danach unangetastet.
// console.log(zahlen);
// console.log(doubled);

// ---------------------------------------------------------
// 3. map() - aus jedem Element wird genau ein neues
// ---------------------------------------------------------

const names = ['Tomas', 'Nicole', 'Katharina', 'Eric', 'Michael'];

// map kann Arrays von beliebigen Werten verarbeiten. Hier wird aus jedem Namen eine Email konstruiert.
// currentName ist das Element, an dem map gerade arbeitet - der Name des
// Parameters ist frei wählbar.

// const emails = names.map(function (currentName) {
//   return currentName.toLowerCase() + '@wbscodingschool.com';
// });

const emails = names.map((currentName) => `${currentName.toLowerCase()}@wbscodingschool.com`);

console.log(emails);

// Typischer Praxisfall: aus Daten HTML bauen.
// map liefert ein Array von <li>-Strings, .join('') fügt sie zu einem
// einzigen String zusammen - ohne join stünden Kommas zwischen den Elementen.
document.querySelector('ul').innerHTML = names
  .map(
    (name) => `
  <li class="name-plaquette">${name}</li>
`,
  )
  .join('');

// ---------------------------------------------------------
// 4. filter() - Elemente aussieben
// ---------------------------------------------------------

// filter erwartet eine Funktion, die true oder false zurückgibt.
// true = Element kommt ins neue Array, false = es fällt raus.
// Die Anzahl der Elemente ändert sich also, die Elemente selbst nicht.
const numbersDividableBy3 = zahlen.filter((currentNumber) => {
  if (currentNumber % 3 === 0) {
    return true;
  } else {
    return false;
  }
});

// Dasselbe kürzer: der Vergleich num % 3 === 0 ergibt bereits true oder false.
// Ein if, das nur true oder false zurückgibt, ist immer überflüssig.
const by3Short = zahlen.filter((num) => num % 3 === 0);

// console.log(numbersDividableBy3);
// console.log(by3Short);

// ---------------------------------------------------------
// 5. find() - das erste passende Element
// ---------------------------------------------------------

// find sieht aus wie filter, liefert aber kein Array, sondern das erste
// Element, das passt - und hört danach sofort auf zu suchen.
// Findet sich nichts, ist das Ergebnis undefined.
const firstGreaterEqual6 = zahlen.find(function (num) {
  if (num >= 6) {
    return true;
  } else {
    return false;
  }
});

const firstGreaterEqual6Short = zahlen.find((num) => num >= 6);

// console.log(firstGreaterEqual6Short);

// console.log(names.find((singleName) => singleName.startsWith('K')));

// ---------------------------------------------------------
// 6. some() / every()
// ---------------------------------------------------------

// some: Erfüllt mindestens ein Element die Bedingung? -> true / false
const hasOneNameWithK = names.some((singleName) => singleName.startsWith('K'));
console.log(hasOneNameWithK);

// every: Erfüllen alle Elemente die Bedingung? -> true / false
// Beide geben nie ein Array zurück, sondern immer nur einen Boolean.
const allNamesContainE = names.every((singleName) => singleName.toLowerCase().includes('e'));

// console.log(allNamesContainE);

// ---------------------------------------------------------
// 7. reduce() - viele Werte zu einem einzigen zusammenfassen
// ---------------------------------------------------------

const zahlen2 = [76, 46, 124, 76, 43, 56, 25, 65, 87, 12];

// Von Hand: eine Variable außerhalb der Schleife, die mitwächst.
// Genau dieses Muster steckt in reduce.
// sum(zahlen2) // sum() gibt es in Python, aber nicht in JS

// let total = 0;
// for (const num of zahlen2) {
//   total += num;
// }
// console.log(total);

// reduce nimmt zwei Dinge: die Funktion und den Startwert (hier die 0 am Ende).
// Der erste Parameter ist das bisherige Zwischenergebnis, der zweite das
// aktuelle Element. Was die Funktion zurückgibt, ist im nächsten Durchlauf
// das neue Zwischenergebnis - am Ende bleibt ein einziger Wert übrig.
const total = zahlen2.reduce((zusammengerechneterWert, aktuellerWert) => {
  return zusammengerechneterWert + aktuellerWert;
}, 0);

console.log(total);

// Dieselbe Mechanik, nur mit Bedingung: acc ("accumulator") ist der
// übliche Kurzname für das Zwischenergebnis. Bei geraden Zahlen wird acc
// unverändert weitergereicht - das Element wird damit einfach übersprungen.
const sumOfOdds = zahlen2.reduce((acc, val) => {
  return val % 2 === 0 ? acc : acc + val;
}, 0);

console.log(sumOfOdds);
