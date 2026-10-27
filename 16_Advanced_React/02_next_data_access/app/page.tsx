// <Image> aus next/image ersetzt das normale <img>. Next.js optimiert das Bild automatisch:
// es wird verkleinert, in moderne Formate wie WebP/AVIF umgewandelt und standardmäßig erst geladen, wenn es ins Bild scrollt (lazy).
import Image from 'next/image';
// Statischer Import: Next.js kennt so schon beim Build Breite und Höhe des Bildes.
// Dadurch springt das Layout beim Laden nicht, und es kann automatisch ein unscharfes Vorschaubild erzeugt werden.
// '@/' ist ein Pfad-Alias für den Projektordner (siehe tsconfig.json).
import hero from '@/public/images/hero.jpg';

export default function Home() {
  return (
    <div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      {/* Zum Vergleich: Ein normales <img> lädt immer das Originalbild in voller Größe, egal wie klein der Bildschirm ist. */}
      {/* <img src='images/hero.jpg' alt='' /> */}
      <div className='relative overflow-hidden rounded-box'>
        <Image
          src={hero}
          // Leerer alt-Text: Das Bild ist rein dekorativ, Screenreader überspringen es.
          alt=''
          // sizes sagt dem Browser, wie breit das Bild angezeigt wird: ab 56rem Bildschirmbreite 56rem breit, sonst volle Breite.
          // Damit wählt er aus den von Next.js erzeugten Größen die passende und lädt keine unnötig großen Dateien.
          sizes='(min-width: 56rem) 56rem, 100vw'
          // preload: Das Bild ist sofort sichtbar ("above the fold"), also wird es früh vorgeladen statt lazy.
          preload
          // Zeigt das unscharfe Vorschaubild, bis das echte Bild geladen ist (geht automatisch nur bei statischem Import).
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
