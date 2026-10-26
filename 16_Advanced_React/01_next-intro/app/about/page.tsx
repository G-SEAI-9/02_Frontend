// File-based Routing: Der Ordner app/about/ mit einer page.tsx ergibt die Route "/about".

// useState funktioniert hier _nicht_: Diese Datei ist eine Server Component,
// und Hooks wie useState gibt es nur in Client Components.
// import { useState } from 'react';

// Lösung: Den interaktiven Teil in eine eigene Client Component auslagern.
// Dateien ohne page.tsx-Namen (wie LikesBtn.tsx) werden keine Route, sondern sind normale Komponenten.
import LikesBtn from './LikesBtn';

// Server Component: wird auf dem Server zu HTML gerendert
export default function AboutPage() {
  return (
    <div className='flex flex-col gap-4'>
      {/* React 19 verschiebt ein <title> automatisch in den <head> und überschreibt so den Titel aus dem Layout. */}
      <title>About | Demo</title>

      <h1 className='text-2xl font-bold font-display'>About us</h1>
      <p className='max-w-prose'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fuga ut facere beatae cum est quae non eligendi
        accusantium sapiente reprehenderit incidunt voluptate cumque asperiores voluptatibus dolores nihil, minus
        voluptas magni in debitis fugit, quidem distinctio veniam. Fugiat quia pariatur nemo animi ullam quasi, placeat
        sapiente architecto consectetur ab harum consequatur beatae soluta est quo molestiae repellat dolores. Unde,
        itaque, sint officia neque quae possimus aliquam provident dolor a autem tempora perspiciatis dolore, vel iste
        aspernatur voluptatum saepe porro quod est voluptates magni! Voluptates, quod? Officiis nesciunt ipsa repellat
        reprehenderit ab eligendi laboriosam est omnis quis modi. Doloremque modi amet nisi alias enim quidem dolor
        corrupti assumenda suscipit voluptates voluptatum tenetur, beatae totam similique expedita ratione veritatis
        optio delectus maiores quae. Perspiciatis, voluptates.
      </p>
      {/* Eine Server Component darf Client Components einbinden. Nur der Button wird im Browser interaktiv. */}
      <LikesBtn />
    </div>
  );
}
