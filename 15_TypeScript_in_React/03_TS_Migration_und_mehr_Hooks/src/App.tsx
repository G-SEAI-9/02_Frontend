import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import About from './pages/About';
import Contact from './pages/Contact';
import Destinations from './pages/Destinations';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SingleDestination from './pages/SingleDestination';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/destinations' element={<Destinations />} />
        <Route path='/destinations/:slug' element={<SingleDestination />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
