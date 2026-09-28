function App() {
  return (
    <>
      <h1>React: Form mit State</h1>
      <form className='flex flex-col w-fit px-5 py-3 gap-5 border-2 rounded mx-auto my-7'>
        <div className='flex justify-between gap-2'>
          <label htmlFor='name'>Name</label>
          <input className='border rounded w-60 px-2 py-1' type='text' name='name' id='name' />
        </div>
        <div className='flex justify-between gap-2'>
          <label htmlFor='email'>Email</label>
          <input className='border rounded w-60 px-2 py-1' type='email' name='email' id='email' />
        </div>
        <div className='flex justify-between gap-2'>
          <label htmlFor='phone'>Phone</label>
          <input className='border rounded w-60 px-2 py-1' type='tel' name='phone' id='phone' />
        </div>
        <div className='flex justify-between gap-2'>
          <label htmlFor='message'>Message</label>
          <textarea className='border rounded w-60 px-2 py-1 h-[5lh]' name='message' id='message'></textarea>
        </div>

        <button
          className='border rounded shadow cursor-pointer px-5 py-2 self-center hover:text-white transition-colors'
          type='submit'
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
