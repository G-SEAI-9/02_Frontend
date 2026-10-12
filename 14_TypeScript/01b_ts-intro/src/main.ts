console.log('running');

// TypeScript leitet den Typ des Objekts automatisch ab (Type Inference):
// { name: string; age: number }
const person = {
  name: 'Guybrush',
  age: 32,
};

// Tippfehler fallen sofort auf: Die Eigenschaft 'nmea' existiert nicht → Fehler im Editor
// console.log(person.nmea);
console.log(person.name);

// Tipp: Nach "person." schlägt der Editor alle Eigenschaften vor (Autovervollständigung)
// person.name

// 'let' mit Startwert 'Hello' → Typ wird als string abgeleitet
let myString = 'Hello';

// Ein neuer string ist erlaubt …
myString = 'Goodbye';

// … eine Zahl nicht: Der Typ einer Variable kann sich nicht mehr ändern
// myString = 123

// Bei 'const' ist der Typ der Wert selbst (Literal-Typ 42), da er sich nie ändern kann
const myNumber = 42;

console.log(myNumber);

const myFavString = 'Moin';

const today = 'Monday';

// Ohne Startwert kann TS nichts ableiten → Typ explizit mit ': string' angeben (Type Annotation)
let something: string;

if (today === 'Monday') {
  something = 'a new value';
  console.log(something);
}

// Explizite Annotation ist hier möglich, aber unnötig – TS würde number auch selbst ableiten
let aNumber: number = 123;

const myFalse: boolean = false;

// Arrays

// Zwei gleichwertige Schreibweisen für ein Array aus Strings: string[] oder Array<string>
// const names: string[] = ['Katharina', 'Michael', 'Nicole', 'Eric', 'Tomas'];
const names: Array<string> = ['Katharina', 'Michael', 'Nicole', 'Eric', 'Tomas'];

names.push('Stephan');
// Fehler: In ein string-Array darf keine Zahl
// names.push(42);

// Leeres Array ohne Typ: TS passt den Typ an das an, was hineingelegt wird
// Besser: den Typ gleich mit angeben (siehe Zeile darunter)
const collectData = [];
// const collectData: number[] = [];

for (let i = 0; i < 5; i++) {
  collectData.push(i);
}

// Mit der Maus darüberfahren: Typ ist jetzt number[]
collectData;

collectData.push(true);

// Und jetzt (number | boolean)[] – genau das verhindert eine explizite Annotation
collectData;

// Eigene Typen

// Mit 'type' geben wir einer Objektform einen Namen und können sie wiederverwenden
type Person = {
  name: string;
  age: number;
  address: string;
};

// Fehlt eine Eigenschaft oder hat sie den falschen Typ, meldet TS einen Fehler
const person1: Person = {
  name: 'Guybrush',
  age: 32,
  address: 'Melee Island',
};

const person2: Person = {
  name: 'Data',
  age: 70,
  address: 'Enterprise',
};

// Union Types

// '|' bedeutet "oder": erlaubt sind genau 'dark', 'light' oder irgendeine Zahl
type Theme = 'dark' | 'light' | number;

// Literal-Typen schränken auf feste Werte ein – 'it' wäre hier ein Fehler
type Settings = {
  language: 'de' | 'en' | 'fr' | 'es';
  theme: Theme;
};

// Typen lassen sich ineinander verschachteln
type Account = {
  id: number;
  settings: Settings;
};

const account: Account = {
  id: 432,
  settings: {
    language: 'en',
    theme: 42,
  },
};

// Functions

// Parameter brauchen eine Typangabe; bei Default-Werten leitet TS den Typ selbst ab (string)
// Der Rückgabetyp (string) wird ebenfalls automatisch erkannt
function greet(name: string, greeting = 'Hello') {
  return `${greeting}, ${name}`;
}

greet('Renke', 'Moin');

const greeting = greet('Anoj', 'Hi');

// Zweites Argument weggelassen → Default 'Hello' wird verwendet
greet('Jorge');

// '?' macht einen Parameter optional – 'unit' ist dann string | undefined
// Achtung: Abgeleiteter Rückgabetyp ist false | string | number – schwer weiterzuverwenden
function format(value: number, unit?: string) {
  if (value <= 0) {
    return false;
  }

  return unit ? `${value} ${unit}` : value;
}

console.log(format(42, '€'));
console.log(format(17));

// Rückgabetyp explizit mit ': string' festlegen – TS prüft, dass jeder return einen string liefert
function formatStr(value: number, unit?: string): string {
  return unit ? `${value} ${unit}` : value.toString();
}

console.log(formatStr(13, '$'));

// Rest-Parameter: beliebig viele Zahlen werden als number[] gesammelt
function sum(...numbers: number[]) {
  return numbers.reduce((acc, val) => acc + val, 0);
}

console.log(sum(1, 2, 3, 4, 5, 6, 7));

// Arrow Functions werden genauso typisiert wie normale Funktionen
const add = (a: number, b: number) => a + b;

console.log(add(4, 2));

// Funktionstyp: beschreibt Parameter und Rückgabewert einer Funktion
type Calculation = (a: number, b: number) => number;

// Mit dem Funktionstyp entfallen die Typen an den Parametern – TS kennt sie schon
// Die Parameternamen dürfen dabei abweichen (siehe 'r'), nur die Typen zählen
const add2: Calculation = (a, b) => a + b;
const substract: Calculation = (a, r) => a - r;
const multiply: Calculation = (a, b) => {
  return a * b;
};

console.log(add2(4, 7));
console.log(substract(4, 7));
console.log(multiply(4, 7));
