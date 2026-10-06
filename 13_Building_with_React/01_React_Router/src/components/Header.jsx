import { NavLink, Link } from 'react-router';

export default function Header() {
  return (
    <header className='header'>
      {/* <Link> statt <a href>: ändert nur die URL, ohne die Seite neu zu laden.
          Dadurch bleibt der React-State erhalten und der Wechsel ist sofort da. */}
      <Link to='/'>
        <h1>Webb Gallery</h1>
        <p>
          Fancy stars
          <span role='img' aria-label='Star'>
            💫
          </span>
        </p>
      </Link>
      <nav>
        <ul>
          <li>
            {/* <NavLink> ist ein <Link>, der weiß, ob er gerade aktiv ist:
                Passt "to" zur aktuellen URL, bekommt er automatisch die Klasse "active" (zum Stylen). */}
            <NavLink className='navlink' to='/'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className='navlink' to='/centauri'>
              Alpha Centauri
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
