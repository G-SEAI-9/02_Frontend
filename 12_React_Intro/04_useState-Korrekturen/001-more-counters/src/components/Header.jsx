// Header bekommt count nur als Prop zum Lesen. Ändert sich der State in App,
// rendert React auch den Header neu und die Zahl hier passt sich automatisch an.
export default function Header({ count }) {
  return (
    <header className='flex justify-between'>
      <h1>React useState</h1>
      <p className='text-4xl text-green-500'>{count}</p>
    </header>
  );
}
