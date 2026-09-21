// ===== 1. Objekt-Literal =====
// Ein Objekt ist eine Sammlung von Key-Value-Paaren.
const marbleTrack = {
  name: 'Murmelbahn',
  price: 65.48,
  url: 'marb.le',
  // Ein Wert darf selbst wieder ein Objekt sein -> verschachtelte Struktur
  notes: {
    color: '#13e087',
  },
  // Funktion als Wert = Methode.
  // `this` zeigt auf das Objekt, über das die Methode aufgerufen wird.
  prepare() {
    console.log(`Diese ${this.notes.color} in Geschenkpapier einwickeln`);
  },
};
// Template-String mit `${...}` ist das JS-Gegenstück zum f-string:
// f"Dies ist ein f-string mit einem dynamischen Wert {42 + 13}"

// Zugriff per Punkt-Notation
// console.log(marbleTrack.name);

// Klammer-Notation: nötig, wenn der Key erst zur Laufzeit feststeht
// const key = 'name';
// console.log(marbleTrack['name']);
// console.log(marbleTrack[key]);

// Beide Notationen lassen sich beliebig mischen und verschachteln
// console.log(marbleTrack.notes.color);
// console.log(marbleTrack['notes']['color']);
// console.log(marbleTrack.notes['color']);

// Objekte sind offen: neue Properties kann man jederzeit anhängen ...
marbleTrack.img = 'https://link.zum/bild';
// console.log(marbleTrack);

// ... und mit delete wieder entfernen
delete marbleTrack.url;

// marbleTrack.prepare();

// ===== 2. Constructor Function: wie man Objekte vor `class` gebaut hat =====
// Mit `new Present(...)` erzeugt JS ein leeres Objekt, `this` zeigt darauf,
// die Funktion füllt es, und das Objekt wird automatisch zurückgegeben.

// function Present(name, price, url) {
//   // console.log(this);
//   // console.log(this);
//   this.name = name;
//   this.price = price;
//   this.url = url;

//   this.prepare = () => {
//     console.log(`Diese ${this.name} in Geschenkpapier einwickeln`);
//   };
// }

// const walkman = new Present('Walkman', 22.41, 'walk.man');
// console.log(walkman);

// walkman.prepare();

//

// ===== 3. Dieselbe Idee als class — mit modernerem Syntax =====
class Present {
  // Class Fields: Vorgabewerte, die jede Instanz bekommt
  name = 'Langweilliges Geschenk';
  url;
  // `#` macht das Feld privat: nur innerhalb dieser Klasse lesbar/schreibbar
  #price;

  // Der Constructor läuft einmal bei `new` und befüllt die Instanz
  constructor(name, price, url) {
    this.name = name;
    this.#price = price;
    this.url = url;
  }

  // Klassische Variante: eine ganz normale Methode, Aufruf mit getPrice()
  // getPrice() {
  //   // return this.#price;
  //   return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.#price);
  // }

  // Getter: sieht beim Aufruf aus wie eine Property (walkman.price),
  // führt aber Code aus — hier die Währungsformatierung via Intl.
  get price() {
    // return this.#price;
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.#price);
  }

  // Klassische Variante des Setters, Aufruf mit setPrice(18.24)
  // setPrice(newPrice) {
  //   const parsedVal = Number.parseFloat(newPrice);

  //   if (Number.isNaN(parsedVal)) throw new TypeError('Price must be a number');
  //   if (parsedVal < 0) throw new TypeError('Price must be a positive number');

  //   this.#price = parsedVal;
  // }

  // Setter: greift bei `walkman.price = 18.41` und kann den Wert prüfen,
  // bevor er ins private Feld geschrieben wird.
  set price(newPrice) {
    const parsedVal = Number.parseFloat(newPrice);

    if (Number.isNaN(parsedVal)) throw new TypeError('Price must be a number');
    if (parsedVal < 0) throw new TypeError('Price must be a positive number');

    this.#price = parsedVal;
  }

  // `return this` gibt die Instanz zurück -> Methoden lassen sich verketten
  prepare() {
    console.log(`Diese ${this.name} in Geschenkpapier einwickeln`);
    return this;
  }

  wrap() {
    const paperAmount = this.name.length * (this.#price / 10);
    console.log(`Wrapping this ${this.name} in ${paperAmount}m² of paper!`);
    return this;
  }

  // toString() ist das JS-Pendant zu Pythons __str__:
  // JS ruft es automatisch auf, wenn das Objekt als Text gebraucht wird.
  toString() {
    // return `${this.name}`;
    return `
    ${this.name}: Price: ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.#price)}`;
  }
}

// Jede Instanz ist ein eigenes Objekt mit eigenen Werten,
// die Methoden teilen sie sich über die Klasse.
const walkman = new Present('Walkman', 22.41, 'walk.man');

// console.log(walkman);
// walkman.prepare();

const marbleTrackClassInstance = new Present('Murmelbahn', 62.99, 'mar.le');
// marbleTrackClassInstance.prepare();

// Setter in Aktion: die zweite Zeile fliegt mit einem TypeError raus
// walkman.price = 0.99;
// walkman.price = ['ha', 'GREMLINS', false];

// Auch Klassen-Instanzen bleiben normale Objekte: anhängen und löschen geht
walkman.nonono = 'Haha';
delete walkman.url;
// console.log(walkman);

// console.log(walkman.getPrice());

// walkman.setPrice(18.24);

// Zuweisung statt Methodenaufruf — dahinter läuft trotzdem der Setter
walkman.price = 18.41;
// console.log(walkman.price);

// walkman.setPrice('dies ist keine Zahl');
// console.log(walkman.getPrice());

// Method Chaining, so wie wir das von Array-Methoden kennen
// walkman.prepare().wrap();
// [1, 2, 3, 4, 5].map().filter().flat()

// console.log(walkman);

// Im Template-String wird automatisch toString() aufgerufen
// console.log(` Dies ist der walkman: ${walkman} `);

// ===== 4. Vererbung: BirthdayPresent ist ein Present mit Extras =====
class BirthdayPresent extends Present {
  constructor(name, price, url, birthday) {
    // super() ruft den Constructor der Elternklasse auf.
    // Muss passieren, bevor man `this` benutzt.
    super(name, price, url);
    this.birthday = birthday;
  }

  // Neue Methode, die es nur in der Kindklasse gibt
  remind() {
    const today = new Date().toDateString();
    const bDay = new Date(this.birthday).toDateString();
    if (today === bDay) return `Denke an den Geburtstag!`;
    return `noch so und so viele tage...`;
  }

  // Gleicher Name wie in Present -> überschreibt die geerbte Methode.
  // Die Instanz nutzt ab jetzt diese Version.
  wrap() {
    const paperAmount = this.name.length * 10;
    console.log(`Wrapping this ${this.name} in ${paperAmount}m² of gift wrapper!`);
    return this;
  }
}

const pedals = new BirthdayPresent('Fahrradpedale', 25.25, 'fahrrad.com', '2027-02-20');

// Getter und Setter werden mitvererbt
console.log(pedals.price);

pedals.price = 20;
console.log(pedals.price);

console.log(pedals.remind());
pedals.wrap();
