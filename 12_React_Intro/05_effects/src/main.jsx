import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  // StrictMode führt useEffect zweimal (bzw. mounted -> unmounted -> mounted jede Komponente)
  // Dadurch fallen Fehler in useEffect schneller auf, vor allem fehlende Cleanups
  <StrictMode>
    <App />
  </StrictMode>,
);
