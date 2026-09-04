// =========================================================
//  JavaScript Arrays
//  Zugriff, Methoden, Schleifen, Sortieren
//  (mit Vergleichen zu Pythons Listen)
// =========================================================

// Ein Array ist das JS-Gegenstück zur Python-Liste:
// eckige Klammern, Werte durch Komma getrennt, Reihenfolge bleibt erhalten.
const myArr = [1, 2, 3, 4, 5, 6];

console.log(myArr);

// ---------------------------------------------------------
// 1. Länge
// ---------------------------------------------------------

// len(myArr)

// In Python fragt man die Länge mit einer Funktion ab: len(myArr).
// In JS ist die Länge eine Eigenschaft des Arrays selbst - ohne Klammern.
console.log(myArr.length);

// ---------------------------------------------------------
// 2. Elemente hinzufügen
// ---------------------------------------------------------

// .push() hängt hinten an und verändert das Array direkt.
myArr.push(7); // Py: append()

console.log(myArr);

// Zwei Unterschiede zu Pythons append():
//   1. push() nimmt beliebig viele Werte auf einmal
//   2. push() gibt die neue Länge zurück (append() gibt None zurück)
const newLength = myArr.push(8, 9, 10);

console.log(myArr);
console.log(`my Array hat eine neue Länge von ${newLength}`);

// Außerdem: myArr ist mit const deklariert und lässt sich trotzdem verändern.
// const schützt die Variable nur vor Neuzuweisung, nicht den Inhalt des Arrays.

// ---------------------------------------------------------
// 3. Zugriff auf einzelne Elemente
// ---------------------------------------------------------

// Zugriff über den Index funktioniert wie in Python, gezählt wird ab 0.
console.log(myArr[0]);

// console.log(myArr[0:4]); // nur in Py

// Slicing mit Doppelpunkt gibt es in JS nicht. Stattdessen die Methode .slice()
// Start ist dabei, Ende nicht - also dieselbe Logik wie [0:4] in Python.
console.log(myArr.slice(0, 4));

// .slice() liefert ein neues Array zurück, das Original bleibt unverändert.
console.log(myArr);

// console.log(myArr[-1]);
// Negative Indizes in eckigen Klammern versteht JS nicht. Es gibt zwei Wege
// zum letzten Element: über die Länge rechnen
console.log(myArr[myArr.length - 1]);

// oder .at(), das negative Indizes wie Python akzeptiert.
console.log(myArr.at(-1));

// Ein Index außerhalb des Arrays wirft in JS keinen Fehler, sondern liefert
// undefined. In Python gäbe es hier einen IndexError.
console.log(myArr[9999]);

// ---------------------------------------------------------
// 4. Gemischte und verschachtelte Arrays
// ---------------------------------------------------------

// Wie eine Python-Liste darf ein Array beliebige Typen mischen:
// Zahlen, Strings, Booleans, andere Arrays - hier sogar myArr selbst.
const stuff = [1, 2, 'wizard', false, [6, 5, [53]], myArr];

console.log(stuff);

// Arrays sind veränderbar (mutable): über den Index lässt sich ein Element
// überschreiben - auch mit einem völlig anderen Typ.
stuff[2] = 'paladin';
stuff[1] = 'durch einen string ersetzt';

console.log(stuff);

// ---------------------------------------------------------
// 5. Schleifen über Arrays
// ---------------------------------------------------------

// for...of entspricht Pythons "for item in stuff":
// man bekommt direkt die Werte, nicht die Indizes.
for (const item of stuff) {
  console.log(item);
}

// Die klassische Zählschleife macht dasselbe, aber über den Index i.
// Nötig, wenn man die Position im Array auch braucht.
for (let i = 0; i < stuff.length; i++) {
  const element = stuff[i];
  console.log(element);
}

// ---------------------------------------------------------
// 6. Elemente entfernen und einfügen
// ---------------------------------------------------------

myArr.push(7);
// .pop() entfernt das letzte Element und gibt es zurück - wie in Python.
const lastElement = myArr.pop();

console.log(myArr);
console.log(lastElement);

// .shift() entfernt das erste Element und gibt es zurück. Py: pop(0)
const firstEl = myArr.shift();
console.log(myArr);

// .unshift() fügt vorne wieder ein. Py: insert(0, firstEl)
myArr.unshift(firstEl);
console.log(myArr);

// ---------------------------------------------------------
// 7. splice: mitten im Array arbeiten
// ---------------------------------------------------------

// .splice(start, anzahl) schneidet Elemente heraus und verändert das Original.
// Hier: ab Index 2 ein Element löschen. Py: del myArr[2]
myArr.splice(2, 1);
console.log(myArr);

// .toSpliced() macht dasselbe, gibt aber eine veränderte Kopie zurück.
// Das "to..." am Anfang ist in modernem JS das Signal: Original bleibt erhalten.
const changedArr = myArr.toSpliced(2, 1);

console.log(changedArr);
console.log(myArr);

// ---------------------------------------------------------
// 8. Sortieren
// ---------------------------------------------------------

const numbers = [7, 2, 54, 98, 56, 24, 7, 454, 1, 65, -4, -63];

// Stolperfalle in JS:
// .sort() ohne Argument behandelt alle Werte als Strings und sortiert
// alphabetisch. Deshalb landet 454 vor 7 und -4 vor -63.
numbers.sort();
console.log(numbers);

// Für echte Zahlensortierung gibt man eine Vergleichsfunktion mit.
// Sie bekommt zwei Werte und liefert eine Zahl:
// negativ -> a vor b, positiv -> b vor a, 0 -> Reihenfolge egal.
// a - b sortiert also aufsteigend, b - a absteigend.
// Schaut auf MDN nach Beispielen
numbers.sort((a, b) => a - b);
console.log(numbers);

// .sort() verändert das Original. .toSorted() gibt eine sortierte Kopie
// zurück, entspricht Pythons sorted().
const sortedArr = numbers.toSorted((a, b) => a - b);
console.log(numbers);
console.log(sortedArr);

// ---------------------------------------------------------
// 9. Array <-> String
// ---------------------------------------------------------

const names = ['Michael', 'Katharina', 'Nicole', 'Eric'];
const separator = ' und ';

// .join() verbindet alle Elemente zu einem String.
// In Python steht der Trenner vorne: separator.join(names)
const allNames = names.join(separator);
console.log(allNames);

// .split() ist die Gegenrichtung: String zerlegen zu einem Array.
// Mit leerem String als Trenner wird nach jedem einzelnen Zeichen getrennt.
console.log(allNames.split(''));

// Mit demselben Trenner wie oben bekommen wir die Namen zurück.
console.log(allNames.split(separator));
