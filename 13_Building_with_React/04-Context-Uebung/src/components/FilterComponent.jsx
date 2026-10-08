import { useTodos } from '../context/TodoContext.jsx';
import { useTodoReducer } from '../context/TodoReducerContex.jsx';

const FilterComponent = () => {
  // const { setFilter } = useTodos();
  const { setFilter } = useTodoReducer();

  const setFilterInView = (filter) => {
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
