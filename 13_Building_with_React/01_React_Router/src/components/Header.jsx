export default function Header() {
  return (
    <header className='header'>
      <a href='#'>
        <h1>Webb Gallery</h1>
        <p>
          Fancy stars
          <span role='img' aria-label='Star'>
            💫
          </span>
        </p>
      </a>
      <nav>
        <ul>
          <li>
            <a className='navlink' href='#'>
              Home
            </a>
          </li>
          <li>
            <a className='navlink' href='#'>
              Alpha Centauri
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
