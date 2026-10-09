import { use, useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { searchProducts } from '../api/index.js';
import { Instructions, SearchForm, SearchResults } from '../components';

const productsPromise = searchProducts();

const searchAction = async (_prev, formData) => searchProducts(Object.fromEntries(formData));

const Search = () => {
  const [state, formAction] = useActionState(searchAction, use(productsPromise)); // { products: filteredProducts, error: null, search: data }

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  return (
    <div className='flex flex-col items-center'>
      <SearchForm formAction={formAction} search={state.search} />
      <SearchResults products={state.products} />
      <Instructions path='/search.md' />
    </div>
  );
};

export default Search;
