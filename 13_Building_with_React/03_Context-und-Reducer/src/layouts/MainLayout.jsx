import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Footer, NavBar } from '../components/index.js';

const MainLayout = () => {
  const [destinations, setDestinations] = useState(null);

  useEffect(() => {
    fetch('/travel.json')
      .then((res) => res.json())
      .then((data) => setDestinations(data));
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='container mx-auto px-4 py-8 mb-auto'>
        {/* TODO: Hier soll je nach URL die passende Seite angezeigt werden – nicht immer nur Home */}
        {destinations ? <Outlet context={destinations} /> : <span className='loading loading-dots loading-xl'></span>}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
