import { useEffect, useState } from 'react';
import type { User } from '../types';

const userArr: User[] = [
  {
    username: 'Guybrush',
    img: 'https://tse3.mm.bing.net/th/id/OIP.5Mfqcem84OfRFXcTOm8LwwHaJQ?r=0&pid=Api',
    info: 'Du kämpfst wie ein Bauer',
    status: 'active',
  },
  {
    username: 'Anakin',
    img: 'https://tse3.mm.bing.net/th/id/OIP.5Mfqcem84OfRFXcTOm8LwwHaJQ?r=0&pid=Api',
    info: 'PodRacer',
  },
];

// Typisierung von useState und useEffect
export default function UserList() {
  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<null | string>(null);

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setLoading(false);
    // fetchen...

    setUsers(userArr);

    setError('Oh no!');
    // setError(42)

    setLoading(true);
  }, []);

  return (
    <div>
      {users.map((u) => (
        <p key={u.id}>{u.username}</p>
      ))}
    </div>
  );
}
