// =========================================================
//  JavaScript Basics
//  Syntax, Operatoren, Kontrollstrukturen, Funktionen, Schleifen
//  (mit Vergleichen zu Python, das wir schon kennen)
// =========================================================

// console.log() ist das JS-Gegenstück zu Pythons print().
// Die Ausgabe landet nicht im Terminal, sondern in der Browser-Konsole
// (Rechtsklick -> Untersuchen -> Tab "Console").
console.log('Hallo aus der script.js');

// Erster Vorgeschmack auf DOM-Manipulation:
// document.querySelector() sucht ein Element im HTML (hier per CSS-Selektor 'h1')
// und .textContent überschreibt dessen Text. Das ist der Grund, warum JS im
// Browser überhaupt interessant ist: Die Seite ändert sich zur Laufzeit.
document.querySelector('h1').textContent = 'Manipuliert mit JavaScript';

// ---------------------------------------------------------
// 1. Variablen und Namensgebung
// ---------------------------------------------------------

// ACHTUNG - so nicht: ohne Schlüsselwort (let/const) erzeugt JS still und leise
// eine globale Variable. In Python wäre das ganz normal (my_variable = 42),
// in JS ist es ein Fehler, den der Browser nur nicht meldet.
my_variable = 42;

// So ist es richtig: Schlüsselwort + Name.
// Namenskonvention in JS ist camelCase, nicht snake_case wie in Python.
// keyword CamelCase-Name
let myVariable = 42;

let myLongVarName = 66234;

// ---------------------------------------------------------
// 2. Strings
// ---------------------------------------------------------

// Einfache und doppelte Anführungszeichen sind gleichwertig - wie in Python.
let myString = 'dies ist ein string';
// let anotherString = "das ist auch einer";

// Der dritte String-Typ: Template Literal, in Backticks `...`.
// Er kann zwei Dinge, die normale Strings nicht können:
//   1. über mehrere Zeilen gehen (wie """...""" in Python)
//   2. Werte per ${...} einsetzen (das JS-Gegenstück zum f-String)
let templateLiteral = `dies ist ein besonderer String,

hier konnen Werte dynamisch eingesetzt werden: ${myLongVarName}`;

console.log(myString);
console.log(anotherString);
console.log(templateLiteral);

// ---------------------------------------------------------
// 3. Operatoren
// ---------------------------------------------------------

// Arithmetische Operatoren

console.log(40 + 4);
console.log(40 - 4);
console.log(40 * 4);
// Vorsicht, Unterschied zu Python: / teilt in JS immer mit Nachkommastellen.
// Ein // für Ganzzahldivision gibt es nicht (// ist in JS ein Kommentar).
console.log(40 / 7);
// % ist der Rest der Division ("Modulo")
console.log(40 % 4);

// Vergleichoperatoren
// Ein Vergleich liefert immer einen Boolean: true oder false
// (kleingeschrieben, anders als Pythons True/False).
console.log(40 > 4);
console.log(40 < 4);
console.log(40 >= 4);
console.log(40 <= 4);

// == vs. ===
//   ==  vergleicht nur den Wert und konvertiert vorher die Typen ("lose")
//   === vergleicht Wert und Typ ("strikt") - das entspricht Pythons ==
console.log('Ist 40 genau gleich 4? ', 40 == 4);
console.log('Ist 40 genau gleich 4? ', 40 === 4);

// Hier sieht man den Unterschied: age1 ist ein String, keine Zahl.
let age1 = '25';

// == sagt true, weil JS den String '25' vorher implizit in die Zahl 25 umwandelt.
console.log('ist 25 Jahre alt?', age1 == 25);
// === sagt false, da String !== Number. Das ist fast immer das, was wir wollen.
console.log('ist 25 Jahre alt?', age1 === 25); // nutzt immer den strikten Vergleichsoperator ===

// Logische Operatoren && ||
// && ist Pythons "and" (beide Seiten müssen wahr sein),
// || ist Pythons "or" (mindestens eine Seite muss wahr sein).
// Für "not" gibt es das Ausrufezeichen: !true
console.log(17 === 16 && 20 === 20);
console.log(17 === 16 || 20 === 20);

// Bitwise Operatoren gibt es auch (selten genutzt)
// Sie rechnen Bit für Bit auf der Binärdarstellung der Zahl.
//  & |
//   0000_0001
// & 0000_0011

// console.log(1 & 3);
// console.log(1 | 3);

// ---------------------------------------------------------
// 4. let, const, var - welches Schlüsselwort wann?
// ---------------------------------------------------------

// let: der Wert darf später neu zugewiesen werden.
let myVariable2 = 42;
myVariable2 = 999;
console.log(myVariable2);

// const: der Wert steht fest. Eine erneute Zuweisung ist ein echter Fehler.
// Faustregel: immer const nehmen, und nur dann let,
// wenn man den Wert wirklich ändern muss.
const myConstant = 25;
// myConstant = 12;

// var ist der historische Vorgänger von let. Es verhält sich beim Scope anders
// (siehe unten) und wird heute nicht mehr benutzt - nur zum Wiedererkennen in altem Code.
var myVar = 123;

//
// ---------------------------------------------------------
// 5. Kontrollstrukturen
// ---------------------------------------------------------

const age = 25;
const minimumAgeForDriversLicense = 18;

// Zum Vergleich dieselbe Verzweigung in Python:
// Dort strukturiert die Einrückung den Code, in JS machen das die
// geschweiften Klammern { }. Die Bedingung steht in runden Klammern ( ).
// Und statt "elif" heißt es "else if".

// if age == minimumAgeForDriversLicense:
//   print("Du darfst die Fahrerlaubnis machen")
// elif age < minimumAgeForDriversLicense:
//   print(...)
// else:
//   print(...)

// Die Bedingungen werden von oben nach unten geprüft. Der erste Treffer gewinnt,
// alle weiteren Zweige werden übersprungen.
if (age === minimumAgeForDriversLicense) {
  console.log('Du kannst eine Fahrerlaubnis machen.');
} else if (age < minimumAgeForDriversLicense) {
  console.log('Du bist noch zu jung');
} else {
  console.log('Du bist älter als die Mindestanforderungen');
}

// Ternary Operator
// Eine Kurzform für ein if/else, das nur einen Wert auswählen soll.
// Python schreibt den Wert zuerst, JS die Bedingung - die Reihenfolge ist also vertauscht.
//                wenn wahr                  Bedingung         wenn falsch
// message = "kannst Fahrerlaubnis machen" if age >= 18 else "bist noch zu jung"

//              Bedingung ?       wenn wahr               :    wenn falsch
const message = age >= 18 ? 'kannst Fahrerlaubnis machen' : 'bist noch zu jung';

console.log('Message: ', message);

const weekday = 'Freitag';

// switch vergleicht einen Wert nacheinander mit mehreren Fällen (case).
// Verglichen wird strikt, also wie mit ===.
switch (weekday) {
  case 'Montag':
    console.log('Die Woche beginnt');
    // break beendet den switch. Ohne break läuft JS in den nächsten case weiter!
    break;
  // Zwei cases ohne Code dazwischen bedeuten: beide führen zum selben Block.
  case 'Dienstag':
  case 'Mittwoch':
    console.log('Es ist ein normaler Wochentag');
    break;

  case 'Donnerstag': // weekday === 'Donnerstag'
    console.log('Es ist ein normaler Donnerstag');
    break;
  case 'Freitag':
    console.log('Es ist fast schon...');
  // Hier fehlt das break mit Absicht: Nach 'Freitag' läuft die Ausführung
  // in den nächsten Block weiter und gibt zusätzlich 'Wochenende!' aus.
  // Dieses "Durchfallen" ist meistens ein Bug - hier ist es gewollt.
  case 'Samstag':
  case 'Sonntag':
    console.log('Wochenende!');
    break;
  // default greift, wenn kein case gepasst hat - wie ein else.
  default:
    console.log('Die Eingabe war fehlerhaft - kein Wochentag');
}

// ---------------------------------------------------------
// 6. Funktionen
// ---------------------------------------------------------

let age3 = 25;

// Python
// def birthday(param):
//   print("Funktionskörper")
//   return param + 1

// In JS heißt das Schlüsselwort function statt def, der Körper steht in { }
// und return funktioniert genauso wie in Python.
function birthday(currentAge) {
  console.log('Funktionskörper');
  // Diese Variable lebt nur innerhalb der Funktion (lokaler Scope).
  // Von außen ist sie nicht sichtbar - siehe die auskommentierte Zeile unten.
  let myFunctionVariable = 'Pikachu';
  // const incrementedAge = age + 1;
  // currentAge += 1;
  // ++ erhöht den Wert um 1. currentAge ist eine Kopie des übergebenen Werts,
  // die Variable draußen bleibt davon unberührt.
  currentAge++;
  // Anders hier: age3 ist eine globale Variable. Die Funktion ändert etwas
  // außerhalb ihrer selbst - das nennt man einen Side Effect (Nebenwirkung)
  // und macht Funktionen schwer nachvollziehbar.
  age3++; // Side Effect
  return currentAge;
}

// Dieselbe Idee als Arrow Function - die kompakte Schreibweise für Funktionen.
// Ohne geschweifte Klammern wird das Ergebnis automatisch zurückgegeben,
// ein return ist dann nicht nötig. Ähnlich zu Pythons lambda, aber in JS gebräuchlicher.
const incrementAge = (currentAge) => currentAge + 1;

console.log('Nach dem Geburtstag bin ich ' + birthday(age3) + ' Jahre alt.');
console.log('Nach dem Geburtstag bin ich ' + incrementAge(age3) + ' Jahre alt.');
// Fehler: myFunctionVariable existiert außerhalb der Funktion nicht.
// console.log(myFunctionVariable);

// ---------------------------------------------------------
// 7. Block Scope
// ---------------------------------------------------------

// Jedes Paar geschweifter Klammern bildet einen eigenen Gültigkeitsbereich.
// Was mit let/const darin deklariert wird, existiert nur dort.
// Python kennt das so nicht - dort gibt es nur Funktions- und Modulebene.
{
  const blockScopeVar = 123;
  console.log(blockScopeVar);
  {
    {
      // Von innen nach außen darf man lesen: innere Blöcke sehen äußere Variablen.
      console.log('innerer Block:', blockScopeVar);
    }
  }
}
// Umgekehrt geht es nicht: hier draußen ist blockScopeVar unbekannt.
// console.log('Globaler Scope:', blockScopeVar);

// ---------------------------------------------------------
// 8. Schleifen
// ---------------------------------------------------------

let counter = 0;

// while: wiederholt, solange die Bedingung wahr ist - wie in Python.
// Wichtig: counter++ am Ende, sonst läuft die Schleife endlos.
while (counter <= 10) {
  console.log('while-Schleife läuft!');
  console.log(counter);
  counter++;
}

// do...while prüft die Bedingung erst nach dem ersten Durchlauf.
// Der Block läuft garantiert mindestens einmal - hier trotz (counter < 0),
// was von Anfang an falsch ist. In Python gibt es diese Variante nicht.
do {
  // block wird mind. einmal ausgeführt
  console.log('do-while-Schleife läuft!');
  console.log(counter);
  counter++;
} while (counter < 0);

// Die klassische for-Schleife zählt selbst hoch. Python löst das über range():
// for i in range(10):
// print(i)

// Drei Teile, durch Semikolon getrennt:
// Start = einmal zu Beginn, Bedingung = vor jedem Durchlauf geprüft,
// Schritt = nach jedem Durchlauf ausgeführt.
//   Start     Bedingung  Schritt
for (let i = 0; i <= 10; i++) {
  console.log(`Zählvariable steht bei ${i}`);
}

const word = 'Bibliothek';

// Über einen String per Index laufen: .length ist die Anzahl der Zeichen
// (in Python: len(word)), word[i] holt das Zeichen an Position i.
// Die Bedingung ist i < word.length, nicht <=, wir stoppen mit dem letzten Index
for (let i = 0; i < word.length; i++) {
  console.log(word[i]);
}

// for...of ist die modernere Variante: sie liefert direkt die Elemente statt der Indizes.
//  Das entspricht genau Pythons "for letter in word".
for (const letter of word) {
  console.log(letter);
}
