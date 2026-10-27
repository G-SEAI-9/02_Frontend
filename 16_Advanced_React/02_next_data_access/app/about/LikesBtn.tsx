'use client';

import { useState } from 'react';

export default function LikesBtn() {
  const [likes, setLikes] = useState(13);
  return (
    <button className='btn btn-accent' onClick={() => setLikes((l) => l + 1)}>
      👍 {likes} likes{' '}
    </button>
  );
}
