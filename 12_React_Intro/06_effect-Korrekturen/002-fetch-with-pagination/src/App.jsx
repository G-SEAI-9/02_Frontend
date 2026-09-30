function App() {
  return (
    <main className='min-h-screen  bg-gray-900 p-8 font-sans'>
      <h1 className='text-3xl font-bold text-center text-gray-300'>Star Wars Characters</h1>

      <div className='flex justify-center gap-4 p-6'>
        <button className='border rounded px-5 py-3' type='button'>
          Previous
        </button>
        <button className='border rounded px-5 py-3' type='button'>
          Next
        </button>
      </div>

      <ul className='grid sm:grid-cols-2 gap-4'>
        <li className='bg-white p-4 rounded shadow text-center capitalize'>
          <span className='font-semibold text-gray-800'>Luke Skywalker</span>
        </li>
        <li className='bg-white p-4 rounded shadow text-center capitalize'>
          <span className='font-semibold text-gray-800'>R2D2</span>
        </li>
        <li className='bg-white p-4 rounded shadow text-center capitalize'>
          <span className='font-semibold text-gray-800'>Anakin Skywalker</span>
        </li>
        <li className='bg-white p-4 rounded shadow text-center capitalize'>
          <span className='font-semibold text-gray-800'>Han Solo</span>
        </li>
      </ul>
    </main>
  );
}

export default App;
