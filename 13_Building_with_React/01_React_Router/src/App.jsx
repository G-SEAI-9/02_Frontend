import { useState } from 'react';
import AlphaCentauri from './pages/AlphaCentauri.jsx';
import Header from './components/Header.jsx';
import Stars from './pages/Stars.jsx';
import { Route, Routes } from 'react-router';
import SingleStar from './pages/SingleStar.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import SecondLayout from './layouts/SecondLayout.jsx';

// Vorher: "Routing" von Hand mit State. Nachteil: Die URL ändert sich nie,
// man kann keine Seite verlinken/bookmarken, der Zurück-Button funktioniert nicht...
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

// Declarative Mode: Die Routen werden als JSX beschrieben.
function App() {
  return (
    // <Routes> schaut auf die aktuelle URL und rendert die passendste <Route>.
    <Routes>
      {/* Layout-Route: MainLayout wird für alle verschachtelten Routen gerendert.
          Die Kind-Route erscheint dort, wo im Layout <Outlet /> steht. */}
      <Route path='/' element={<MainLayout />}>
        {/* index = die Standard-Kindroute, also genau "/" */}
        <Route index element={<Stars />} />

        {/* Pfade von Kindrouten sind relativ (ohne "/") → ergibt "/centauri" */}
        <Route path='centauri' element={<AlphaCentauri />} />

        {/* ":slug" ist ein dynamisches Segment (URL-Parameter).
            "/star/crab-nebula" und "/star/pillars-of-creation" landen beide hier; auslesen mit useParams() */}
        <Route path='star/:slug' element={<SingleStar />} />
      </Route>

      {/* "*" passt auf jeden Pfad, den keine andere Route trifft → 404-Seite.
          Hier zusätzlich mit eigenem Layout, um zu zeigen, dass es mehrere Layouts geben kann. (Nur ein Beispiel!) */}
      <Route path='*' element={<SecondLayout />}>
        <Route path='*' element={<h1>404: Not found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
