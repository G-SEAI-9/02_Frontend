import { Link } from 'react-router';
import { useBooking } from '../../context/BookingContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

const DestinationCard = ({ title, image, text, slug }) => {
  const { theme } = useTheme();
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
        <p>{text}</p>
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
