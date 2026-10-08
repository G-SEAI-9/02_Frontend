import { Link } from 'react-router';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useBooking } from '../../context/BookingContext.jsx';

const DestinationCard = ({ title, image, text, slug }) => {
  // const value = useContext(ThemeContext);
  // const theme = value.theme;
  // const { theme } = useContext(ThemeContext);

  // Werte direkt aus den Contexts holen – keine Props von Eltern nötig.
  const { theme } = useTheme();
  const { bookedDestinations, addDestination, removeDestination } = useBooking();

  // Aus dem Context-State abgeleitet: Ist diese Karte schon gebucht?
  const isBooked = bookedDestinations.includes(slug);

  // console.log(theme);

  return (
    <div data-theme={theme} className='card bg-base-100 shadow-md'>
      <figure>
        <img src={image} alt={title} className='h-48 w-full object-cover' />
      </figure>
      <div className='card-body'>
        <Link to={`/destinations/${slug}`}>
          <h2 className='card-title text-lg font-semibold hover:text-primary'>{title}</h2>
        </Link>
        <p>{text}</p>
        <div className='card-actions justify-end'>
          {/* Der Klick löst über addDestination/removeDestination eine Action im Reducer aus.
              Der neue State erreicht danach automatisch auch die NavBar. */}
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
