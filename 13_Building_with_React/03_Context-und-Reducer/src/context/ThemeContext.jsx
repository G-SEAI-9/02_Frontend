import { createContext, useContext, useState } from 'react';

// createContext legt einen "Datenkanal" an, über den Komponenten Werte
// lesen können, ohne dass sie als Props durch jede Ebene gereicht werden.
// 'halloween' ist nur der Fallback, falls eine Komponente außerhalb des Providers liegt.
const ThemeContext = createContext('halloween'); // Datenlager

const ALLOWED_THEMES = ['halloween', 'cyberpunk', 'retro', 'dim', 'abyss'];

// Der Provider besitzt den State und stellt ihn allen Kind-Komponenten bereit.
export default function ThemeContextProvider({ children }) {
  // const theme = 'retro';
  // Ein normaler useState – erst durch den Provider wird er "global" verfügbar.
  const [theme, setTheme] = useState('dim');

  // Statt setTheme direkt herauszugeben, bieten wir eine Funktion mit Prüfung an.
  function changeTheme(newTheme) {
    if (ALLOWED_THEMES.includes(newTheme)) setTheme(newTheme);
  }

  const value = { theme, changeTheme, ALLOWED_THEMES };

  // value stellt einen einzelnen Wert zur Verfügung.
  // Mehrere Elemente können wir in einem Array oder Objekt bündeln.
  return <ThemeContext value={value}>{children}</ThemeContext>;
}

// Custom Hook als bequemer Zugang zum Context.
export function useTheme() {
  return useContext(ThemeContext);
}
