import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Footer, NavBar } from '../components';
import BookingContextProvider from '../context/BookingContext';
import type { Destination } from '../types';

const MainLayout = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    fetch('/travel.json')
      .then((res) => res.json())
      .then((data: Destination[]) => setDestinations(data));
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <BookingContextProvider>
        <NavBar />
        <main className='container mx-auto px-4 py-8 mb-auto'>
          {destinations ? <Outlet context={destinations} /> : <span className='loading loading-dots loading-xl'></span>}
        </main>
      </BookingContextProvider>
      <Footer />
    </div>
  );
};

export default MainLayout;
