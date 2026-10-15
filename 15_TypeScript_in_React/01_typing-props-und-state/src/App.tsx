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
    </>
  );
}

export default App;

//
