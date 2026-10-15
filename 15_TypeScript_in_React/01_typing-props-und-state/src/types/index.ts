// Gemeinsamer Typ für einen User – wird in mehreren Komponenten wiederverwendet,
// darum liegt er in einer eigenen Datei statt in einer Komponente.
type User = {
  username: string;
  img: string;
  info: string;
  // Das "?" macht ein Feld optional: es darf fehlen (ist dann undefined).
  // Union-Typ aus String-Literalen: nur genau diese Werte sind erlaubt.
  status?: 'active' | 'paused' | 'inactive' | 'deleted' | 'gesperrt';
  id?: number;
  email?: string;
};

// "export type" exportiert nur den Typ – er existiert nur zur Entwicklungszeit
// und verschwindet beim Kompilieren komplett aus dem JavaScript.
export type { User };
