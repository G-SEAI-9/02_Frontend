'use client';
// 'use client' macht diese Datei zur Client Component. Sie muss ganz oben stehen.
// Ihr JavaScript wird an den Browser geschickt, deshalb sind hier State, Hooks und Event-Handler erlaubt.
// Tipp: 'use client' so tief wie möglich im Baum setzen, damit möglichst wenig JS im Browser landet.

import { useState } from 'react';

export default function LikesBtn() {
  const [likes, setLikes] = useState(13);
  return (
    // onClick braucht den Browser – genau dafür ist diese Komponente eine Client Component.
    <button className='btn btn-accent' onClick={() => setLikes((l) => l + 1)}>
      👍 {likes} likes{' '}
    </button>
  );
}
