import { useEffect, useState } from 'react';
import type { User } from '../types';

// User[] = ein Array, in dem jedes Element ein User sein muss.
const userArr: User[] = [
  {
    username: 'Guybrush',
    img: 'https://tse3.mm.bing.net/th/id/OIP.5Mfqcem84OfRFXcTOm8LwwHaJQ?r=0&pid=Api',
    info: 'Du kämpfst wie ein Bauer',
    status: 'active',
  },
  {
    // status fehlt hier – erlaubt, weil er im User-Typ optional ist.
    username: 'Anakin',
    img: 'https://tse3.mm.bing.net/th/id/OIP.5Mfqcem84OfRFXcTOm8LwwHaJQ?r=0&pid=Api',
    info: 'PodRacer',
  },
];

// Typisierung von useState und useEffect
export default function UserList() {
  // Kein Typ nötig: TypeScript leitet aus dem Startwert 0 den Typ number ab (Type Inference).
  const [count, setCount] = useState(0);

  // Genauso hier: aus true wird boolean abgeleitet.
  const [loading, setLoading] = useState(true);

  // Startwert null reicht nicht, weil später ein string hinein soll.
  // Mit dem Generic <null | string> sagen wir: erlaubt sind null ODER ein string.
  const [error, setError] = useState<null | string>(null);

  // Ein leeres Array [] wäre never[] – da passt nie etwas hinein.
  // Darum geben wir den Typ explizit an: ein Array von Usern.
  const [users, setUsers] = useState<User[]>([]);

  // useEffect braucht keine eigene Typisierung – die Setter sind bereits typisiert.
  useEffect(() => {
    setLoading(false);
    // fetchen...

    setUsers(userArr);

    setError('Oh no!');
    // Fehler: 42 ist eine number, erlaubt sind nur null | string.
    // setError(42)

    setLoading(true);
  }, []);

  return (
    <div>
      {/* TypeScript kennt den Typ von u (User), daher gibt es Autovervollständigung für u.username */}
      {users.map((u) => (
        <p key={u.id}>{u.username}</p>
      ))}
    </div>
  );
}
