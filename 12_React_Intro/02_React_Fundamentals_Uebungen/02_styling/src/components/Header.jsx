import Navigation from './Navigation.jsx';
import './Header.css';

function Header() {
  const color = 'green';

  return (
    <header className='my-header'>
      <h1
        style={{
          backgroundColor: color,
        }}
      >
        React Fundamentals | Styling
      </h1>
      <Navigation />
    </header>
  );
}

export default Header;
