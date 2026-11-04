import type { CartItem } from '@/types';
import { CartBadge, ProductCard } from '@/components';
import { CartProvider } from '@/context';

const products: CartItem[] = [
  {
    id: 1,
    name: 'Sample Product',
    image: 'https://picsum.photos/id/238/300',
    price: 19.99,
  },
  {
    id: 2,
    name: 'Another Product',
    image: 'https://picsum.photos/id/67/300',
    price: 29.99,
  },
  {
    id: 3,
    name: 'Third Product',
    image: 'https://picsum.photos/id/42/300',
    price: 39.99,
  },
  {
    id: 4,
    name: 'Fourth Product',
    image: 'https://picsum.photos/id/123/300',
    price: 49.99,
  },
  {
    id: 5,
    name: 'Fifth Product',
    image: 'https://picsum.photos/id/321/300',
    price: 59.99,
  },
];

const App = () => {
  return (
    <CartProvider>
      <div className='container mx-auto'>
        <CartBadge />
        <div className='flex flex-wrap gap-5 mt-23 justify-center'>
          {products.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      </div>
    </CartProvider>
  );
};

export default App;
