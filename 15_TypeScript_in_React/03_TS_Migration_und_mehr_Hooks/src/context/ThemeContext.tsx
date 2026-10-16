import { createContext, useContext, useState } from 'react';

// 'as const' macht das Array schreibgeschützt und merkt sich die genauen Strings.
// Ohne 'as const' wäre der Typ nur string[]; mit ist er readonly ['halloween', 'cyberpunk', ...].
const ALLOWED_THEMES = ['halloween', 'cyberpunk', 'retro', 'dim', 'abyss', 'forest'] as const;

// Aus dem Array einen Union-Typ machen: 'halloween' | 'cyberpunk' | 'retro' | ...
type Theme = (typeof ALLOWED_THEMES)[number];

// Die öffentliche Schnittstelle des Contexts.
// changeTheme nimmt bewusst einen beliebigen string an, weil z. B. ein <select> immer strings liefert.
// Ob der string ein gültiges Theme ist, prüfen wir erst im Provider.
type ThemeContextValue = {
  theme: Theme;
  changeTheme: (newTheme: string) => void;
  ALLOWED_THEMES: typeof ALLOWED_THEMES;
};

// Ein "Type Guard": Der Rückgabetyp 'value is Theme' sagt TS:
// "Wenn diese Funktion true liefert, ist 'value' ein Theme."
// Der Cast auf readonly string[] ist nötig, weil .includes() sonst nur Themes als Argument erlaubt.
function isTheme(value: string): value is Theme {
  return (ALLOWED_THEMES as readonly string[]).includes(value);
}

// Wie beim BookingContext: Typ in <...> angeben, null als Startwert bis der Provider übernimmt.
const ThemeContext = createContext<ThemeContextValue | null>(null); // Datenlager

// Props inline typisiert: nur 'children', und das ist alles, was React rendern kann.
export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  // useState<Theme>: Ohne die Angabe würde TS aus 'dim' den Typ string ableiten,
  // und setTheme würde jeden beliebigen string akzeptieren.
  const [theme, setTheme] = useState<Theme>('dim');

  function changeTheme(newTheme: string) {
    // Erst nach dem Type Guard ist newTheme vom Typ Theme – vorher würde setTheme(newTheme) einen Fehler werfen.
    if (isTheme(newTheme)) setTheme(newTheme);
  }

  const value = { theme, changeTheme, ALLOWED_THEMES };

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  // Diese Prüfung entfernt 'null' aus dem Typ. Ohne sie müsste man in Komponenten
  // useTheme()! schreiben (siehe auskommentierte Zeile in DestinationCard).
  if (!context) throw new Error('useTheme must be used withing the <ThemeContextprovider>');

  return context;
}
