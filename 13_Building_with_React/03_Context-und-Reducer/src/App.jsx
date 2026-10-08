import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Destinations from './pages/Destinations.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import SingleDestination from './pages/SingleDestination.jsx';

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
