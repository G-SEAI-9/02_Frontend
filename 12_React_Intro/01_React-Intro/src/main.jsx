import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Einstiegspunkt der App: React übernimmt das <div id="root"> aus index.html
// und rendert dort unsere oberste Komponente <App />. Alles andere hängt darunter.
// StrictMode ist ein Entwickler-Helfer, der auf typische Fehler hinweist (keine sichtbare Ausgabe).
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
