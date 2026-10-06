import { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router';
import { starsLoader } from '../data/loaders.js';

export default function SingleStar() {
  // useParams() liest die dynamischen Teile der URL aus.
  // Route "star/:slug" + URL "/star/crab-nebula" → { slug: 'crab-nebula' }
  const { slug } = useParams();

  // Alle Sterne kommen aus dem MainLayout (siehe <Outlet context={stars} />).
  // Mit dem slug aus der URL suchen wir den passenden Stern heraus.
  const stars = useOutletContext();
  const star = stars.find((star) => star.slug === slug);

  // Vorher, bzw. alternative Strategie:
  // Detailansicht kann eigene Daten fetchen
  // const [star, setStar] = useState(null);
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
    // Absoluter Pfad (mit "/") → Klick führt zurück zur Startseite
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
