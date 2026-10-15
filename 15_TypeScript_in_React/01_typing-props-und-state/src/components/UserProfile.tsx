import type { User } from '../types';

type UserProfileProps = Pick<User, 'username' | 'img' | 'status' | 'info'>;

// type UserProfileProps = {
//   username: string;
//   img?: string;
//   info: string;
//   status?: 'active' | 'paused' | 'inactive';
// };

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

function tsFunction(para: string) {}
