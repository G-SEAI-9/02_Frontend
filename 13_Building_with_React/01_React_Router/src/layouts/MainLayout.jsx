import { Outlet } from 'react-router';
import Header from '../components/Header.jsx';
import { useEffect, useState } from 'react';
import Stars from '../pages/Stars.jsx';
import { starsLoader } from '../data/loaders.js';

// Ein Layout ist der gemeinsame "Rahmen" (Header, Footer) für mehrere Seiten.
// Die Daten werden hier einmal geladen und bleiben erhalten, wenn man zwischen den Kindseiten wechselt.
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
      {/* Platzhalter: Hier rendert React Router die aktuell passende Kindroute
          (Stars, AlphaCentauri oder SingleStar).
          Über "context" geben wir Daten an diese Kindroute weiter → dort useOutletContext() */}
      <Outlet context={stars} />

      {/* <Stars stars={stars} /> */}

      <footer>&copy; footerbla</footer>
    </div>
  );
}
