import { Link } from 'react-router';

const Card = ({ star }) => {
  const { url, heading, description, slug } = star;

  return (
    // Die ganze Karte ist ein Link zur Detailseite, z. B. "/star/sirius".
    // Der slug füllt den Platzhalter ":slug" aus der Route in App.jsx.
    <Link to={`/star/${slug}`}>
      <article className='star'>
        <div>
          <img src={url} alt={heading} className='star__img' />
        </div>
        <h3 className='star__heading'>{heading}</h3>
        <p className='star__description'>{description}</p>
      </article>
    </Link>
  );
};

export default Card;
