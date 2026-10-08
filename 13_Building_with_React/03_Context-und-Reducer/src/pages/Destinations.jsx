import { useOutletContext } from 'react-router';
import { DestinationCard } from '../components';

const Destinations = () => {
  const destinations = useOutletContext();
  return (
    <div className='space-y-10 px-4 max-w-7xl mx-auto'>
      <section className='text-center space-y-2'>
        <h1 className='text-4xl font-bold text-primary'>Explore All Destinations</h1>
        <p className='text-lg text-base-content'>
          Discover exciting and affordable travel spots curated just for software engineering students.
        </p>
      </section>
      <section className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {destinations.map(({ title, image, description, slug }) => (
          <DestinationCard key={slug} title={title} image={image} text={description} slug={slug} />
        ))}
      </section>
    </div>
  );
};

export default Destinations;
