import { useState } from 'react';
import AlphaCentauri from './pages/AlphaCentauri.jsx';
import Header from './components/Header.jsx';
import Stars from './pages/Stars.jsx';
import { Route, Routes } from 'react-router';
import SingleStar from './pages/SingleStar.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import SecondLayout from './layouts/SecondLayout.jsx';

// function App() {
//   const [page, setPage] = useState('centauri'); // "home", "centauri"

//   return (
//     <div className='body'>
//       <Header setPage={setPage} />
//       <main>
//         {page === 'home' && <Stars />}

//         {page === 'centauri' && <AlphaCentauri />}
//       </main>
//       <footer>&copy; footerbla</footer>
//     </div>
//   );
// }

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Stars />} />

        <Route path='centauri' element={<AlphaCentauri />} />

        <Route path='star/:slug' element={<SingleStar />} />
      </Route>

      <Route path='*' element={<SecondLayout />}>
        <Route path='*' element={<h1>404: Not found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
