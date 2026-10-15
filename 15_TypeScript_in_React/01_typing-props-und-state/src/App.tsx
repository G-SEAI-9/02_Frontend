import Button from './components/Button';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import type { User } from './types';

const user: User = {
  username: 'Guybrush',
  img: 'https://tse3.mm.bing.net/th/id/OIP.5Mfqcem84OfRFXcTOm8LwwHaJQ?r=0&pid=Api',
  info: 'Du kämpfst wie ein Bauer',
  status: 'active',
};

type myNumber = number;

// let someValue: myNumber = 'hello';

function App() {
  return (
    <>
      {/* Typisierung von Props */}
      <UserProfile key={12} username={user.username} img={user.img} info={user.info} status={user.status} />
      {/* Typisierung von Hooks */}
      <UserList />

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
