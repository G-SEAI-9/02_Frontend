import Header from './components/Header.jsx';
import Stars from './components/Stars.jsx';

function App() {
  return (
    <div className='body'>
      <Header />
      <main>
        <Stars />
      </main>
      <footer>&copy; footerbla</footer>
    </div>
  );
}

export default App;
