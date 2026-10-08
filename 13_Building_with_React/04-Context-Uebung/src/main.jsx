import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import TodoContextProvider from './context/TodoContext.jsx';
import TodoReducerProvider from './context/TodoReducerContex.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoReducerProvider>
      {/* <TodoContextProvider> */}
      <App />
      {/* </TodoContextProvider> */}
    </TodoReducerProvider>
  </StrictMode>,
);
