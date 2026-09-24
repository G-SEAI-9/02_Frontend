import Greeting from './Greeting.jsx';

// Export direkt vor der Funktion – macht dasselbe wie "export default Footer" am Dateiende
export default function Footer() {
  // Vor dem return können wir ganz normales JavaScript ausführen
  const date = new Date();
  const year = date.getFullYear();

  // Das Ergebnis setzen wir mit { } ins JSX ein. &copy; ist die HTML-Entity für ©
  return <footer>&copy; {year}</footer>;
}
