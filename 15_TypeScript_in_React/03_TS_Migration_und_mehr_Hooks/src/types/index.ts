// Gemeinsamer Typ für ein Reiseziel aus travel.json.
// Liegt in einer eigenen Datei, damit Layout, Seiten und Komponenten denselben Typ verwenden.
type Destination = {
  id: number;
  slug: string;
  title: string;
  image: string;
  description: string;
};

export type { Destination };
