import type { Filter } from '../types';

type FilterComponentProps = {
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

const FilterComponent = ({ setFilter }: FilterComponentProps) => {
  const setFilterInView = (filter: Filter) => {
    setFilter(filter);
  };

  return (
    <div className='mb-4 flex space-x-2'>
      <button type='button' onClick={() => setFilterInView('all')} className='bg-gray-200 px-3 py-1 rounded'>
        All
      </button>
      <button type='button' onClick={() => setFilterInView('active')} className='bg-gray-200 px-3 py-1 rounded'>
        Active
      </button>
      <button type='button' onClick={() => setFilterInView('completed')} className='bg-gray-200 px-3 py-1 rounded'>
        Completed
      </button>
    </div>
  );
};

export default FilterComponent;
