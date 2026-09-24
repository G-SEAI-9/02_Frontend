// CSS wird einfach importiert – Vite bindet es automatisch in die Seite ein
import './Header.css';

// Eine Komponente ohne Props: sie zeigt immer dasselbe an
function Header() {
  return (
    <header>
      <nav>
        <ul>
          {/* JSX sieht aus wie HTML, ist aber JavaScript.
              Deshalb heißt es className statt class – "class" ist in JS ein reserviertes Wort. */}
          <li className='nav-element'>
            <a href='#top'>Home</a>
          </li>
          <li className='nav-element'>
            <a href='#top'>About</a>
          </li>
          <li className='nav-element'>
            <a href='#top'>Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
