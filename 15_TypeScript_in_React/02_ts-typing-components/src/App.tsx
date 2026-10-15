import { useState } from 'react';
import Alert from './components/Alert';
import Avatar from './components/Avatar';
import Counter from './components/Counter';
import Greeting from './components/Greeting';
import ProductList from './components/ProductList';
import ProfileCard from './components/ProfileCard';
import Status from './components/Status';
import Toggle from './components/Toggle';
import Container from './layouts/Container';

const App = () => {
  const [isOn, setIsOn] = useState(false);

  const onToggle = () => {
    setIsOn((o) => !o);
  };

  return (
    <Container style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Greeting name={'Michael'} />
      <Greeting />
      <Counter initialCount={0} />
      <Status status='success' />
      <ProfileCard user={{ name: 'Ada', age: 36 }} />
      <Alert message={'Alles ist kaputt'} type='error' />
      <ProductList
        products={[
          { id: 1, title: 'Book' },
          { id: 2, title: 'Pen' },
        ]}
      />
      <Toggle isOn={isOn} onToggle={onToggle} setIsOn={setIsOn} />
      <Avatar url={'https://tse3.mm.bing.net/th/id/OIP.5Mfqcem84OfRFXcTOm8LwwHaJQ?r=0&pid=Api'} altText={'Ein Pirat'} />
    </Container>
  );
};

export default App;
