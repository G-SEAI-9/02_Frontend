import Image from 'next/image';
import hero from '@/public/images/hero.jpg';

export default function Home() {
  return (
    <div className='flex flex-col flex-1 items-center justify-center'>
      <div className='relative overflow-hidden rounded-box'>
        <Image
          src={hero}
          alt=''
          sizes='(min-width: 56rem) 56rem, 100vw'
          preload
          placeholder='blur'
          className='h-64 w-full object-cover'
        />

        <h1 className='absolute inset-0 grid place-items-center font-display text-5xl font-bold text-slate-200 drop-shadow-lg text-shadow-lg'>
          Wilkommen zu Next.js
        </h1>
      </div>
    </div>
  );
}
