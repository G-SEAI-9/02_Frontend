// Type Aliases und Interfaces
console.log('Hello');

// Ein Type Alias gibt einer Objektform einen Namen, den wir wiederverwenden können.
// Diese Felder hat jeder Datensatz aus der Datenbank (z.B. MongoDB).
type DBEntry = {
  _id: string;
  __v: string;
  createdAt: string;
};

// & - Intersection: User hat ALLE Felder von DBEntry UND alle Felder aus dem Objekt rechts.
type User = DBEntry & {
  name: string;
  email: string;
  setting: {
    theme: string;
    // Union aus String-Literalen: nur genau diese vier Werte sind erlaubt
    language: 'en' | 'de' | 'fr' | 'es'; // Union
  };
};

// Dieselbe Basis (DBEntry) wiederverwenden, statt _id, __v, createdAt erneut zu tippen
type BlogPost = DBEntry & {
  body: string;
  title: string;
  slug: string;
};

const user1: User = {
  _id: '1',
  // ... und weiter Felder
  // TS checkt hier nach DBEntry und User
};

// Dasselbe mit Interfaces: Ein Interface beschreibt ebenfalls die Form eines Objekts.
interface DBEntryInterface {
  _id: string;
  __v: string;
  createdAt: string;
}

// extends ist bei Interfaces das Gegenstück zu & bei Type Aliases
interface UserInterface extends DBEntryInterface {
  name: string;
  email: string;
  setting: {
    theme: string;
    language: 'en' | 'de' | 'fr' | 'es'; // Union
  };
}

// Interface Merging: Ein zweites Interface mit gleichem Namen wird mit dem ersten zusammengeführt.
// UserInterface braucht jetzt zusätzlich lastDevice. Mit `type` geht das nicht (Fehler: doppelter Name).
interface UserInterface {
  lastDevice: string;
}

// Dieses Objekt muss alle Felder aus beiden UserInterface-Deklarationen und DBEntryInterface haben
const user2: UserInterface = {
  name: 'Guybrush',
  email: 'mighty@pirate.gov',
  setting: { language: 'es', theme: 'dark' },
  __v: '1',
  _id: '2',
  createdAt: '2026-10-13',
  lastDevice: 'chromebook',
};

// Type Narrowing
// = TypeScript "verengt" einen breiten Typ (z.B. string | MessageObj) innerhalb
//   eines if-Zweigs auf einen genaueren Typ, weil die Prüfung andere Typen ausschließt.

type MessageObj = {
  message: string;
};

function alertUser(value: string | MessageObj) {
  // typeof-Prüfung: Im if-Zweig weiß TS, dass value ein string ist
  if (typeof value === 'string') {
    value.split('');
  } else {
    // Im else-Zweig bleibt nur noch MessageObj übrig
    value.message.split('');
  }
}

// function formatStr(value: number, unit: string | undefined): string {
// unit? = optionaler Parameter, entspricht dem Typ string | undefined (darf aber ganz weggelassen werden)
function formatStr(value: number, unit?: string): string {
  // Prüfung auf undefined: danach ist unit im else-Zweig sicher ein string
  if (unit === undefined) {
    return `${value}`;
  } else {
    return `${value}${unit}`;
  }
}

function compare(x: string | number, y: string | boolean) {
  // Gleichheits-Narrowing: x und y können nur gleich sein, wenn beide strings sind
  // (string ist der einzige Typ, den beide gemeinsam haben). Deshalb sind hier beide string.
  if (x === y) {
    x.split('');
    y.endsWith('str');
  }
}

// Discriminated Union: Jeder Typ hat ein Feld `kind` mit einem festen Literal-Wert.
// Über dieses Feld kann TS sicher unterscheiden, welcher Typ vorliegt.
type Dog = {
  kind: 'dog';
  name: string;
  age: number;
  favouritePlace: string;
  bark: (times: number) => void;
};

type Cat = {
  kind: 'cat';
  name: string;
  age: number;
  meow: () => void;
};

type Pet = Cat | Dog;

// Hilfsfunktionen für Narrowing. Seit TS 5.5 erkennt TypeScript selbst, dass
// isCat true nur für Cat liefert (inferred type predicate: `pet is Cat`).
// Explizit geschrieben: function isCat(pet: Pet): pet is Cat { ... }
// Rückgabe hier nicht explizit typisieren!
function isCat(pet: Pet) {
  return pet.kind === 'cat';
}

function isDog(pet: Pet) {
  return pet.kind === 'dog';
}

function makeNoise(pet: Pet) {
  // name und age haben beide Typen, darauf können wir ohne Narrowing zugreifen
  console.log(`${pet.name} is ${pet.age} years old.`);

  // in-Operator: Nur Dog hat favouritePlace, also ist pet hier ein Dog
  if ('favouritePlace' in pet) {
    // liegt gesuchtes Property in Objekt
    console.log(`${pet.name} is in ${pet.favouritePlace} and barking ${pet.bark(5)}`);
  }

  // Narrowing über das Diskriminator-Feld kind
  if (pet.kind === 'cat') {
    pet.meow();
  }

  // Narrowing über die Hilfsfunktionen (Type Predicates)
  if (isCat(pet)) {
    pet.meow();
  }
  if (isDog(pet)) {
    pet.bark(4);
  }
}

// Narrowing im catch-Block

function handleError() {
  try {
    const randomNum = Math.random();

    // In JavaScript kann man ALLES werfen, nicht nur Error-Objekte
    if (randomNum < 0.33) {
      throw 'hehehe';
    } else if (randomNum < 0.66) {
      throw new Error('Oh no!');
    } else {
      throw new TypeError('Vertippt!');
    }
  } catch (error) {
    // error hat den Typ unknown, weil alles geworfen werden kann.
    // Direkter Zugriff auf .message ist deshalb verboten:
    // error.message;

    // instanceof-Prüfung: Ist error ein Objekt der Klasse TypeError?
    if (error instanceof TypeError) {
      console.log(`TypeError: ${error.message}`);
    }
    // oder ansonsten ein einfacher Error?
    else if (error instanceof Error) {
      console.log(`Normaler Fehler: ${error.message}`);
    } else {
      // Alles andere (z.B. der geworfene String) bleibt unknown
      console.log('Unexpected Error: ', JSON.stringify(error));
    }
  }
}

// Assertions
// Wenn wir mit externen Systemen interagieren, z.B. DOM, localStorage, fetch,
// hat TypeScript keine Möglichkeit, dort die Typen zu prüfen.
// TS läuft nur in der Entwicklung, nicht wenn ein User die Anwendung nutzt (Laufzeit)
// In so einem Fall müssen wir TS die Typisierung vorgeben.

// querySelector liefert HTMLDialogElement | null, denn das Element könnte fehlen
const dialogEl = document.querySelector('dialog');

// Sauberer Weg ohne Assertion: per if auf null prüfen (Narrowing)
if (dialogEl) {
  dialogEl.showModal();
}

// Kurzform: ?. ruft showModal nur auf, wenn dialogEl nicht null/undefined ist
dialogEl?.showModal(); // Optional Chaining

// non-null assertion - wir wissen dass form-Element immer im DOM ist
// Das ! am Ende entfernt null aus dem Typ. Fehlt das Element doch, crasht es zur Laufzeit.
// const formEl = document.querySelector("form")!

// formEl.addEventListener("click", () => {})

// Type Assertion mit `as`: wir legen den Typ selbst fest (hier ohne null)
// Ebenso Fehleranfällig wie das !
// const formEl = document.querySelector('form') as HTMLFormElement;

// formEl.addEventListener('click', () => {});

// Expliziter Check:
// Rückgabetyp never: Die Funktion kehrt nie normal zurück, sie wirft immer einen Fehler
function throwElementNotFound(selector: string): never {
  throw new Error(`Element not found:  ${selector}`);
}

// ?? nimmt die rechte Seite, wenn links null/undefined steht.
// Weil die rechte Seite never ist, bleibt für formEl nur HTMLFormElement übrig:
// sicher wie Narrowing, aber mit klarer Fehlermeldung statt stillem Crash.
const formEl = document.querySelector('form') ?? throwElementNotFound('form');

formEl.reset();

//

//  localStorage

const dataFromLocalStorage = `[{ "id": 1, "url": "example.com", "title": "Hello, World!" }]`;

type JournalEntry = {
  id: number;
  url: string;
  title: string;
};

function getJournalFromLocalStorage() {
  // getItem liefert string | null, mit ?? fallen wir auf ein leeres Array zurück
  const data = localStorage.getItem('diary') ?? '[]';

  // JSON.parse gibt `any` zurück: TS weiß nicht, was im String steckt.
  // Beide Varianten geben dem Ergebnis einen Typ,
  // können aber nicht prüfen, ob die Daten wirklich passen.
  // const parsedData = JSON.parse(data) as JournalEntry[] ;
  const parsedData: JournalEntry[] = JSON.parse(data);

  return parsedData;
}

// Dank des Typs bekommen wir jetzt Autovervollständigung für .title
const data = getJournalFromLocalStorage();

data[0].title;

// Typ für die Antwort der API, nachgebaut anhand der JSON-Daten
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');

  // res.json() liefert Promise<any>, also gleiches Prinzip wie bei JSON.parse:
  // Wir legen den Typ fest, TS vertraut uns ohne Prüfung.
  // const data = (await res.json()) as Post[];
  const data: Post[] = await res.json();

  return data;
}

const posts = await fetchPosts();

posts[0].body;
