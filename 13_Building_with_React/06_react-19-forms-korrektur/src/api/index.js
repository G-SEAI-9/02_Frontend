// Zod is a validation library: we describe what valid data looks like (a "schema"),
// and Zod checks incoming data against it. You will learn Zod in detail later in the course.
import z from 'zod/v4';

// A schema for a single value: it must be a valid email address
const newsletterSchema = z.email('Invalid email address');

// A schema for an object: every key has its own rule and error message
const contactFormSchema = z.object({
  firstName: z.string('First name needs to be a string').min(1, 'First name is required'),
  lastName: z.string('Last name needs to be a string').min(1, 'Last name is required'),
  email: z.email('Invalid email address'),
  message: z.string('Message needs to be a string').min(1, 'Message is required'),
});

// Form fields always arrive as strings, even <input type="number">.
// This rule turns an empty field into undefined ("no limit")
// and converts ("coerces") anything else into a number that must not be negative.
const optionalPrice = z.preprocess(
  (value) => (value === '' ? undefined : value),
  z.coerce.number().nonnegative().optional(),
);

// All search filters are optional, so an empty search is valid and returns every product
const productSearchSchema = z.object({
  category: z.string().optional(),
  minPrice: optionalPrice,
  maxPrice: optionalPrice,
  query: z.string().optional(),
});

export const registerNewsletter = async (email) => {
  // Fake a slow network request so you can see pending states in the UI
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // safeParse does not throw: it returns either the valid `data` or an `error`
  const { data, error } = newsletterSchema.safeParse(email);
  // prettifyError turns Zod's error object into a readable message
  if (error) throw new Error(z.prettifyError(error));
  const newsletterList = JSON.parse(localStorage.getItem('newsletterList')) || [];
  if (newsletterList.includes(data)) throw new Error(`Email ${data} is already registered.`);
  newsletterList.push(data);
  localStorage.setItem('newsletterList', JSON.stringify(newsletterList));
  return `Successfully registered ${data} to the newsletter!`;
};

export const sendContactForm = async ({ firstName, lastName, email, message }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { data, error } = contactFormSchema.safeParse({
    firstName,
    lastName,
    email,
    message,
  });
  if (error) throw new Error(z.prettifyError(error));
  return `Thank you for your message, ${data.firstName}! We will get back to you soon.`;
};

// Pass the form values as an object, e.g. searchProducts(Object.fromEntries(formData)).
// Unlike the functions above, this one does not throw: it always returns an object
// with `products`, `error` and the validated `search` values.
export const searchProducts = async (search = {}) => {
  const { data, error } = productSearchSchema.safeParse(search);
  if (error) return { error: z.prettifyError(error), products: [] };
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) return { error: 'Something went wrong while fetching products', products: [] };
  const products = await response.json();
  // This API cannot filter by itself, so we load all products and filter them here
  const filteredProducts = products.filter((product) => {
    const matchesCategory = !data.category || product.category === data.category;
    const matchesMinPrice = data.minPrice === undefined || product.price >= data.minPrice;
    const matchesMaxPrice = data.maxPrice === undefined || product.price <= data.maxPrice;
    const matchesQuery = !data.query || product.title.toLowerCase().includes(data.query.toLowerCase());

    return matchesCategory && matchesMinPrice && matchesMaxPrice && matchesQuery;
  });
  return { products: filteredProducts, error: null, search: data };
};
