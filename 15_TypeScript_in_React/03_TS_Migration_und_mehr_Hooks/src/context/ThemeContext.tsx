import { createContext, useContext, useState } from 'react';

const ALLOWED_THEMES = ['halloween', 'cyberpunk', 'retro', 'dim', 'abyss', 'forest'] as const;

type Theme = (typeof ALLOWED_THEMES)[number];

type ThemeContextValue = {
  theme: Theme;
  changeTheme: (newTheme: string) => void;
  ALLOWED_THEMES: typeof ALLOWED_THEMES;
};

function isTheme(value: string): value is Theme {
  return (ALLOWED_THEMES as readonly string[]).includes(value);
}

const ThemeContext = createContext<ThemeContextValue | null>(null); // Datenlager

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dim');

  function changeTheme(newTheme: string) {
    if (isTheme(newTheme)) setTheme(newTheme);
  }

  const value = { theme, changeTheme, ALLOWED_THEMES };

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('useTheme must be used withing the <ThemeContextprovider>');

  return context;
}
