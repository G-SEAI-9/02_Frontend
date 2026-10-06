import { Outlet } from 'react-router';
import Header from '../components/Header.jsx';
import { useEffect, useState } from 'react';
import Stars from '../pages/Stars.jsx';
import { starsLoader } from '../data/loaders.js';

export default function MainLayout() {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await starsLoader();
      console.log(data);
      setStars(data);
    };
    fetchData();
  }, []);

  // console.log('Ist user eingeloggt?');

  return (
    <div className='body'>
      <Header />
      {/* Platzhalter */}
      <Outlet context={stars} />

      {/* <Stars stars={stars} /> */}

      <footer>&copy; footerbla</footer>
    </div>
  );
}
