import { Routes, Route } from 'react-router';
import { MainLayout } from './layouts';
import { Contact, Home, NotFound, Register, Search } from './pages';

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/search' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
