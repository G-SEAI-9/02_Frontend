import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
  const [prefersDark, setPrefersDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (evt) => setPrefersDark(evt.matches);
    mq.addEventListener('change', handleChange);

    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
      <nav className='navbar bg-base-100 shadow-sm'>
        <div className='flex-1'>
          <Link to='/' className='btn btn-ghost normal-case text-xl'>
            Form Submission
          </Link>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal px-1'>
            <NavLink to='/register' className='btn btn-ghost'>
              Register
            </NavLink>
            <NavLink to='/contact' className='btn btn-ghost'>
              Contact
            </NavLink>
            <NavLink to='/search' className='btn btn-ghost'>
              Search
            </NavLink>
          </ul>
        </div>
      </nav>
      <ToastContainer theme={prefersDark ? 'dark' : 'light'} />
      <main>
        <div className='container mx-auto p-4'>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
