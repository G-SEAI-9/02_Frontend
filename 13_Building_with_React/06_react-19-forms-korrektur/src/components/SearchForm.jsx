import SubmitBtn from './SubmitBtn.jsx';

const SearchForm = ({ formAction, search }) => {
  return (
    <form action={formAction} className='w-full max-w-4xl'>
      <fieldset className='bg-base-200 border border-base-300 rounded-box p-4'>
        <legend className='fieldset-legend mb-2'>Search Products</legend>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 items-end'>
          <div className='flex flex-col'>
            <label className='label text-sm font-medium' htmlFor='category'>
              Category
            </label>
            <input
              className='input input-bordered w-full'
              name='category'
              placeholder='Category'
              id='category'
              defaultValue={search.category}
            />
          </div>
          <div className='flex flex-col'>
            <label className='label text-sm font-medium' htmlFor='minPrice'>
              Min Price
            </label>
            <input
              type='number'
              className='input input-bordered w-full'
              name='minPrice'
              placeholder='Min'
              id='minPrice'
              defaultValue={search.minPrice}
            />
          </div>
          <div className='flex flex-col'>
            <label className='label text-sm font-medium' htmlFor='maxPrice'>
              Max Price
            </label>
            <input
              type='number'
              className='input input-bordered w-full'
              name='maxPrice'
              placeholder='Max'
              id='maxPrice'
              defaultValue={search.maxPrice}
            />
          </div>
          <div className='flex flex-col'>
            <label className='label text-sm font-medium' htmlFor='description'>
              Description
            </label>
            <input
              className='input input-bordered w-full'
              name='query'
              placeholder='Search keyword'
              id='description'
              defaultValue={search.query}
            />
          </div>
          <div className='flex justify-end md:items-end'>
            {/* <button type='submit' className='btn btn-neutral w-full md:w-auto mt-1 md:mt-0'>
              Search
            </button> */}
            <SubmitBtn>Search</SubmitBtn>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default SearchForm;
