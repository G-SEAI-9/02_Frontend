import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter verbindet React mit der URL-Leiste des Browsers (History API).
        Er muss die ganze App umschließen, damit Routes, Link & Co. darin funktionieren. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
