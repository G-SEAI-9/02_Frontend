// components/ProductList.tsx
// This component should receive a `products` array where each product has an `id` (number) and `title` (string)
const ProductList = ({ products }) => {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
};

export default ProductList;
