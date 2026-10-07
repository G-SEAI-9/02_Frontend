import { Link, NavLink } from 'react-router';

const NavBar = () => {
  return (
    <div className='navbar bg-base-100 shadow-sm'>
      <div className='flex-1'>
        <Link className='btn btn-ghost text-xl' to='/'>
          Travel Agency
        </Link>
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
