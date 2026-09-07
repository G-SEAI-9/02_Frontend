// Ein Objekt ist eine Sammlung von Key-Value-Paaren
// in geschweiften Klammern. Links der Key, rechts der Wert.
//  Anders als in Python müssen die Keys nicht in Anführungszeichen stehen.
const myObj = {
  welt: 'world',
  erde: 'earth',
};

// console.log(myObj);
// console.dir(myObj);

// Werte auslesen:
// Klammer-Schreibweise: der Key steht als String in eckigen Klammern
console.log(myObj['welt']);

// Vorteil der Klammer-Schreibweise: der Key kann in einer Variable stecken
// const key = 'erde';

// console.log(myObj[key]);

// Punkt-Schreibweise: kürzer und der Normalfall
console.log(myObj.erde);

// Werte können jeden Datentyp haben: String, Zahl, Boolean, Array,
// ein weiteres Objekt oder eine Funktion (Methode).
const sheep = {
  name: 'Alba',
  color: '#fff',
  age: 12.1,
  geschoren: true,

  // Zahlen als Key und Keys mit Leerzeichen sind erlaubt –
  // Sonderzeichen wie Space erzwingen dann Anführungszeichen.
  // Für beide benötigt man eckigen Klammern zum Auslesen, nicht Punkt.
  1: 'sie ist die Nummer 1',
  'lieblings futter': ['Heu', 'Hafer'],
  // Verschachteltes Objekt: ein Objekt als Wert innerhalb eines Objekts
  location: {
    lat: 53,
    lng: 12.123,
  },

  // Eine Funktion als Wert nennt man Methode
  greet() {
    return 'Määh';
  },

  // "this" zeigt auf das Objekt selbst, hier also auf sheep
  sayName() {
    return `Dieses Schaf heißt ${this.name}`;
  },
};

// // console.log(sheep.name);
// // console.log(sheep[1]);
// // console.log(sheep['lieblings futter']);

// // // Erstes Element im "lieblings futter"
// // console.log(sheep['lieblings futter'][0]);

// Zugriffe lassen sich verketten: erst location holen, dann daraus lat
console.log(sheep.location.lat);

// Vorhandene Werte überschreibt man durch einfaches Zuweisen
sheep.age = 13;
// console.log(sheep);

// Ist der Key noch nicht da, wird er neu angelegt
sheep.race = 'Ouessant';
// console.log(sheep);

// sheep.geschoren = false;

// Ein nicht existierender Key wirft keinen Fehler, sondern gibt undefined zurück
console.log(sheep.notThere);

// if (sheep.geschoren) {
//   console.log('Das Schaf hat kurze Wolle');
// }

// sheep.notThere ist undefined, was "falsy" ist – deshalb greift die Bedingung mit dem ! davor
if (!sheep.notThere) {
  console.log('sheep.undefiend existert nicht');
}

// delete entfernt ein Key-Value-Paar komplett aus dem Objekt
delete sheep[1];
delete sheep.race;

// Methoden wie Funktionen aufrufen
// console.log(sheep.greet());

// sheep.name = 'Rosalie';
// console.log(sheep.sayName());

// const name = 'Edwin';

// Destructuring: zieht Werte aus dem Objekt in eigene Variablen.
// Mit "name: n" wird der Key name in die Variable n umbenannt –
// praktisch, wenn der Name schon vergeben ist. color heißt weiter color.
const { name: n, color } = sheep;

// console.log(color);

// color ist const – ein Neuzuweisen würde einen Fehler werfen
// color = 'grey';
// console.log(color);
// console.log(sheep);

// console.log(n);

// Destructuring geht auch verschachtelt: aus location das lng holen
// und dabei z.B. in longitude umbenennen
// const {
//   location: { lng: longitude },
// } = sheep;

// // console.log(lng);
// console.log(longitude);

const numbers = [10, 20, 30, 40];

console.dir(numbers);

// for...in läuft über die Keys – bei einem Array sind das die Indizes
// (und zwar als Strings: "0", "1", "2", "3")
for (const num in numbers) {
  console.log(num);
}
// for...of läuft über die Werte selbst: 10, 20, 30, 40
for (const num of numbers) {
  console.log(num);
}

// for...in über ein Objekt: key ist der Schlüssel,
// den Wert holt man sich mit sheep[key] (Punkt geht hier nicht,
// weil key eine Variable ist)
for (const key in sheep) {
  console.log(`Key ${key} zeight auf Wert: ${sheep[key]}`);
}
