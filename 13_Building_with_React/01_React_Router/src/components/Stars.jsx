import { useEffect, useState } from 'react';
import Card from './Card.jsx';
import { starsLoader } from '../data/loaders.js';

const Stars = () => {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await starsLoader();
      console.log(data);
      setStars(data);
    };
    fetchData();
  }, []);

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
