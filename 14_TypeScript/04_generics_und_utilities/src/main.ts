// Generics und eingebaute Helfertypes (Utilities)
// Generic = ein Typ-Parameter (meist T genannt), der wie ein Funktionsparameter
// erst beim Aufruf festgelegt wird. So bleibt Code wiederverwendbar und typsicher.

const dataFromLocalStorage = `[{ "id": 1, "url": "example.com", "title": "Hello, World!" }]`;

type JournalEntry = {
  id: number;
  url: string;
  title: string;
};

type TaxFormData = {
  steuernummer: string;
};

// <T> deklariert einen Typ-Parameter. Wer die Funktion aufruft, bestimmt, was T ist.
// Vorher (Lektion 03) war JournalEntry[] fest eingebaut, jetzt funktioniert sie für jeden Key.
function getLocalStorage<T>(key: string) {
  const data = localStorage.getItem(key) ?? '[]';

  // const parsedData = JSON.parse(data) as T ;
  // Das Ergebnis bekommt den Typ T, also den Typ, den der Aufrufer angibt
  const parsedData: T = JSON.parse(data);

  return parsedData;
}

// T = JournalEntry[]  →  diaryData hat den Typ JournalEntry[]
const diaryData = getLocalStorage<JournalEntry[]>('diary');

// Gleiche Funktion, anderer Typ: T = TaxFormData  →  taxData hat den Typ TaxFormData
const taxData = getLocalStorage<TaxFormData>('taxform');

// Generics kennen wir schon: Array<string> ist dasselbe wie string[]
const names: Array<string> = ['Katharina', 'Michael', 'Nicole', 'Eric', 'Tomas'];

// Der Typ-Parameter darf auch komplex sein, hier eine Union
const numbers: Array<number | boolean> = [12, 5, 65, 23, true];

// Generischer Type Alias. `T = string` ist ein Standardwert (Default),
// der gilt, wenn beim Verwenden kein Typ angegeben wird.
type MyGenericType<T = string> = {
  name: string;
  id: number;
  somethingCompletelyDifferent: T;
};

// T = boolean  →  somethingCompletelyDifferent muss ein boolean sein
const myGenericThing: MyGenericType<boolean> = {
  name: 'Guybrush',
  id: 1,
  somethingCompletelyDifferent: true,
};

// Kein Typ angegeben  →  Default greift, T = string
const myGenericThingTwo: MyGenericType = {
  name: 'Worf',
  id: 13,
  somethingCompletelyDifferent: 'string is default',
};

// Utility

type Todo = {
  title: string | { message: string };
  description: string;
  completed: boolean;
};

type TodoPreview = Pick<Todo, 'title' | 'completed'>;

type IncompleteTodo = Partial<Todo>;

const todo1: IncompleteTodo = {
  title: 'Carpe Diem',
};

type IncompleteTodoPreview = Partial<Pick<Todo, 'title' | 'completed'>>;

type ReadonlyTodo = {
  readonly title: string;
  description: string;
  completed: boolean;
};

const todoRO: ReadonlyTodo = {
  title: 'Carpe Diem',
  description: 'Pflücke den Tag',
  completed: false,
};

todoRO.completed = true;
todoRO.title = 'Aleus iacta est';

type ReadOnlyTodo = Readonly<Todo>;

function renderTodo(todo: Readonly<Todo>) {
  // todo.completed = false
  console.log(todo.title);
}
