import { Link } from 'react-router';
import { useBooking } from '../../context/BookingContext';
import { useTheme } from '../../context/ThemeContext';
import type { Destination } from '../../types';

// type DestinationCardProps = {
//   title: string;
//   image: string;
//   text: string;
//   slug: string;
// };

type DestinationCardProps = Pick<Destination, 'title' | 'image' | 'description' | 'slug'>;

const DestinationCard = ({ title, image, description, slug }: DestinationCardProps) => {
  // const { theme } = useTheme()!;
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
