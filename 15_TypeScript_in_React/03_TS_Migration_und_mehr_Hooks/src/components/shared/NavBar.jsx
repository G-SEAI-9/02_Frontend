import { Link, NavLink } from 'react-router';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useBooking } from '../../context/BookingContext.jsx';

const NavBar = () => {
  // const { changeTheme, theme, ALLOWED_THEMES } = useContext(ThemeContext);

  const { changeTheme, theme, ALLOWED_THEMES } = useTheme();
  // Die NavBar liest denselben Buchungs-State wie die DestinationCards,
  // obwohl sie in einem ganz anderen Zweig des Komponentenbaums liegt.
  const { bookingCount } = useBooking();

  return (
    <div className='navbar bg-base-100 shadow-sm'>
      <div className='flex flex-1 gap-11'>
        <div className='indicator'>
          {bookingCount > 0 && <span className='indicator-item badge badge-secondary'>{bookingCount}</span>}
          <Link className='btn btn-ghost text-xl' to='/'>
            Travel Agency
          </Link>
        </div>

        <select className='select capitalize' defaultValue={theme} onChange={(e) => changeTheme(e.target.value)}>
          {/* <option value='halloween'>Halloween</option>
          <option value='retro'>Retro</option>
          <option value='cyberpunk'>Cyberpunk</option>
          <option value='dim'>Dim</option>
          <option value='abyss'>Abyss</option>
          <option value='forest'>Forest</option> */}

          {ALLOWED_THEMES.map((th) => (
            <option value={th}>{th}</option>
          ))}
        </select>
      </div>
      <nav className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'underline underline-offset-2' : '')} to='/'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'underline underline-offset-2' : '')} to='/about'>
              About
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'underline underline-offset-2' : '')} to='/destinations'>
              Destinations
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'underline underline-offset-2' : '')} to='/contact'>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
