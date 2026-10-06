import { NavLink, Link } from 'react-router';

export default function Header() {
  return (
    <header className='header'>
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
