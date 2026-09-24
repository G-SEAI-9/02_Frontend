import './App.css';
// Jede Komponente liegt in einer eigenen Datei und wird hier importiert,
// damit wir sie wie ein eigenes HTML-Tag verwenden können (z. B. <Header />).
import Footer from './components/Footer.jsx';
import Greeting from './components/Greeting.jsx';
import Header from './components/Header.jsx';
import Student from './components/Student.jsx';

// Ganz normale JS-Daten: ein Array von Objekten.
// Später machen wir daraus mit .map() eine Liste von <Student>-Komponenten.
const students = [
  { id: 1, name: 'Tomas' },
  { id: 2, name: 'Nicole' },
  { id: 3, name: 'Michael' },
  { id: 4, name: 'Eric' },
  { id: 5, name: 'Katharina' },
];

// Eine Komponente ist einfach eine Funktion, die JSX zurückgibt.
// Wichtig: Der Name beginnt mit einem Großbuchstaben, sonst hält React sie für ein HTML-Tag.
function App() {
  return (
    // Eine Komponente darf nur ein Element zurückgeben.
    // Das leere Tag <>...</> (Fragment) fasst mehrere Elemente zusammen,
    // ohne ein zusätzliches <div> ins HTML zu schreiben.
    <>
      <Header />

      {/* Props: Wir geben der Komponente Werte mit, ähnlich wie HTML-Attribute.
          Strings, Zahlen, Variablen usw. kommen in geschweifte Klammern { }. */}
      <Greeting word={'Hello'} test={42} />
      {/* Dieselbe Komponente lässt sich beliebig oft wiederverwenden.
          Ohne Props ist "word" hier undefined → Greeting zeigt den Standardtext. */}
      <Greeting />
      <Greeting />
      <Greeting />
      <Greeting word={'Moin'} />

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse velit provident aspernatur, doloremque enim
        dolorum dolorem, alias blanditiis nulla placeat nisi itaque possimus animi debitis et, fugiat nemo! Cupiditate,
        blanditiis?
      </p>

      <ul>
        {/* .map() macht aus jedem Objekt im Array eine <Student>-Komponente.
            React kann ein Array von JSX-Elementen direkt anzeigen.
            "key" braucht React, um jedes Listenelement eindeutig wiederzuerkennen –
            deshalb nehmen wir die id und nicht z. B. den Index. */}
        {students.map((s) => (
          <Student key={s.id} name={s.name} />
        ))}
      </ul>

      <Footer />
    </>
  );
}

// Default-Export, damit main.jsx die Komponente mit "import App from ..." holen kann
export default App;
