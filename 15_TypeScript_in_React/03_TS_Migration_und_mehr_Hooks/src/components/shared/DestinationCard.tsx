import { Link } from 'react-router';
import { useBooking } from '../../context/BookingContext';
import { useTheme } from '../../context/ThemeContext';
import type { Destination } from '../../types';

// Variante 1: Props-Typ von Hand schreiben – jedes Feld einzeln.
// type DestinationCardProps = {
//   title: string;
//   image: string;
//   text: string;
//   slug: string;
// };

// Variante 2: Pick<Typ, 'feld' | 'feld'> nimmt nur die genannten Felder aus Destination.
// Vorteil: Ändert sich Destination, passt sich der Props-Typ automatisch an.
type DestinationCardProps = Pick<Destination, 'title' | 'image' | 'description' | 'slug'>;

// Der Props-Typ steht hinter dem destrukturierten Objekt, nicht hinter jedem einzelnen Namen.
const DestinationCard = ({ title, image, description, slug }: DestinationCardProps) => {
  // Mit '!' würden wir TS nur versprechen, dass der Wert nicht null ist – ohne echte Prüfung.
  // Mit der Anpassung prüft useTheme() nun selbst auf null.
  // const { theme } = useTheme()!;
  const { theme } = useTheme();
  // Dank der Typen im Context kennt TS hier alle Felder und bietet Autocomplete an.
  const { bookedDestinations, addDestination, removeDestination } = useBooking();

  const isBooked = bookedDestinations.includes(slug);

  return (
    <div data-theme={theme} className='card bg-base-100 shadow-md'>
      <figure>
        <img src={image} alt={title} className='h-48 w-full object-cover' />
      </figure>
      <div className='card-body'>
        <Link to={`/destinations/${slug}`}>
          <h2 className='card-title text-lg font-semibold hover:text-primary'>{title}</h2>
        </Link>
        <p>{description}</p>
        <div className='card-actions justify-end'>
          <button
            type='button'
            className={` btn ${isBooked ? 'btn-error' : 'btn-primary'} `}
            onClick={() => (isBooked ? removeDestination(slug) : addDestination(slug))}
          >
            {isBooked ? 'Unbook' : 'Book now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
