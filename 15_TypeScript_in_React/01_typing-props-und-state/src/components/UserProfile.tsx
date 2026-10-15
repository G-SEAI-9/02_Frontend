// "import type" holt nur den Typ, keinen Laufzeit-Code.
import type { User } from '../types';

// Pick<Typ, 'a' | 'b'> baut einen neuen Typ aus ausgewählten Feldern eines bestehenden Typs.
// So bleiben die Props automatisch synchron, wenn sich User ändert.
type UserProfileProps = Pick<User, 'username' | 'img' | 'status' | 'info'>;

// Variante 1: Props-Typ von Hand schreiben – gleiche Wirkung, aber doppelt gepflegt.
// type UserProfileProps = {
//   username: string;
//   img?: string;
//   info: string;
//   status?: 'active' | 'paused' | 'inactive';
// };

// Variante 2: Props als ein Objekt "props" annehmen und mit props.xyz darauf zugreifen.
// export default function UserProfile(props: UserProfileProps) {
//   return (
//     <article>
//       <h2>{props.username}</h2>
//       <img src={props.img || 'https://tse3.mm.bing.net/th/id/OIP.5Mfqcem84OfRFXcTOm8LwwHaJQ?r=0&pid=Api'} alt='' />
//       <p>{props.info}</p>
//       <p>Status: {props.status}</p>
//     </article>
//   );
// }

// Gängigste Schreibweise: Props direkt in der Parameterliste destrukturieren
// und das ganze Objekt mit ": UserProfileProps" typisieren.
// Fehlt beim Aufruf ein Pflicht-Prop oder hat er den falschen Typ, meldet es TypeScript sofort.
export default function UserProfile({ username, info, img, status }: UserProfileProps) {
  return (
    <article>
      <h2>{username}</h2>
      <img src={img || 'https://tse3.mm.bing.net/th/id/OIP.5Mfqcem84OfRFXcTOm8LwwHaJQ?r=0&pid=Api'} alt='' />
      <p>{info}</p>
      <p>Status: {status}</p>
    </article>
  );
}

// Variante 3: Typ inline direkt nach der Destrukturierung – funktioniert,
// wird bei vielen Props aber schnell unübersichtlich.
// export default function UserProfile({
//   username,
//   info,
//   img,
//   status,
// }: {
//   username: string;
//   info: string;
//   img: string;
//   status: string;
// }) {
//   return (
//     <article>
//       <h2>{username}</h2>
//       <img src={img || 'https://tse3.mm.bing.net/th/id/OIP.5Mfqcem84OfRFXcTOm8LwwHaJQ?r=0&pid=Api'} alt='' />
//       <p>{info}</p>
//       <p>Status: {status}</p>
//     </article>
//   );
// }
