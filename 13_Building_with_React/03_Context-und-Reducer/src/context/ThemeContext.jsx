import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('halloween'); // Datenlager

const ALLOWED_THEMES = ['halloween', 'cyberpunk', 'retro', 'dim', 'abyss'];

export default function ThemeContextProvider({ children }) {
  // const theme = 'retro';
  const [theme, setTheme] = useState('dim');

  function changeTheme(newTheme) {
    if (ALLOWED_THEMES.includes(newTheme)) setTheme(newTheme);
  }

  const value = { theme, changeTheme, ALLOWED_THEMES };

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
