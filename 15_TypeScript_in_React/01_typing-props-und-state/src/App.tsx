import Button from './components/Button';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import type { User } from './types';

// Durch ": User" prüft TypeScript, dass das Objekt genau zum User-Typ passt.
const user: User = {
  username: 'Guybrush',
  img: 'https://tse3.mm.bing.net/th/id/OIP.5Mfqcem84OfRFXcTOm8LwwHaJQ?r=0&pid=Api',
  info: 'Du kämpfst wie ein Bauer',
  status: 'active',
};

// Ein Type Alias gibt einem Typ einen eigenen Namen.
type myNumber = number;

// Fehler: 'hello' ist ein string, myNumber erwartet aber eine number.
// let someValue: myNumber = 'hello';

function App() {
  return (
    <>
      {/* Typisierung von Props */}
      {/* Vergessen wir hier einen Pflicht-Prop (z.B. username), zeigt TypeScript direkt einen Fehler. */}
      <UserProfile key={12} username={user.username} img={user.img} info={user.info} status={user.status} />
      {/* Typisierung von Hooks */}
      <UserList />

      {/* Unser Button akzeptiert dank ComponentProps<'button'> alle normalen Button-Props
          (type, onClick, className, style) plus unseren eigenen Prop username. */}
      <Button
        type='button'
        onClick={() => {
          alert('Button geklickt!');
        }}
        className='btn btn-primary'
        style={{
          backgroundColor: 'rebeccapurple',
        }}
        username={'Guybrush'}
      >
        <span>Click My Button!</span>
      </Button>

      {/* Zum Vergleich: ein ganz normaler HTML-Button mit Props. */}
      <button
        className='btn btn-primary'
        style={{
          backgroundColor: 'rebeccapurple',
        }}
        type='button'
      >
        Normaler Btn
      </button>
    </>
  );
}

export default App;

//
