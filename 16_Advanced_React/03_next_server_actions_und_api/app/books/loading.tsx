export default function Loading() {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold font-display'>Books</h1>
      <ul className='list rounded-box bg-base-200'>
        {Array.from({ length: 12 }).map((_, index) => (
          <li key={index} className='list-row'>
            <h2 className='skeleton w-48 font-semibold'>&nbsp;</h2>
            <p className='skeleton w-10 text-sm opacity-70'>&nbsp;</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
