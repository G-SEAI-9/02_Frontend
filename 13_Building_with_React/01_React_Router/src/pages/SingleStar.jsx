import { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router';
import { starsLoader } from '../data/loaders.js';

export default function SingleStar() {
  // const [star, setStar] = useState(null);

  const { slug } = useParams();

  const stars = useOutletContext();
  const star = stars.find((star) => star.slug === slug);

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await starsLoader();
  //     const foundStar = data.find((star) => star.slug === slug);
  //     console.log({ foundStar });
  //     setStar(foundStar);
  //   }

  //   fetchData();
  // }, [slug]);

  return star ? (
    <Link to='/'>
      <article className='star--single'>
        <img className='star__img' src={star?.url ?? 'http://localhost:5173/alpha-centauri.jpeg'} alt='' />
        <h1 className='star__heading'>{star?.heading}</h1>
        <p className='star__description'>{star?.description}</p>
      </article>
    </Link>
  ) : (
    <p className='message--loading'>Loading...</p>
  );
}
