import { useEffect, useState } from 'react';
import Card from '../components/Card.jsx';
import { starsLoader } from '../data/loaders.js';
import { useOutletContext } from 'react-router';

const Stars = () => {
  // const [stars, setStars] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await starsLoader();
  //     console.log(data);
  //     setStars(data);
  //   };
  //   fetchData();
  // }, []);

  // Statt selbst zu fetchen, holen wir die Daten aus dem Eltern-Layout:
  // useOutletContext() liefert, was MainLayout an <Outlet context={...} /> übergeben hat.
  const stars = useOutletContext();

  if (!stars) return <p className='message--loading'>Loading...</p>;

  return (
    <>
      <div className='grid'>
        {stars?.map((star) => (
          <Card star={star} key={star.id} />
        ))}
      </div>
      <span className='scroll-thingy' role='img' aria-label='Scroll Thingy Rocket'></span>
    </>
  );
};

export default Stars;
