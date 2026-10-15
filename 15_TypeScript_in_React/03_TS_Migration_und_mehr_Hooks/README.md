# Ein JS-React-Projekt für TypeScript vorbereiten

## 1. Pakete installieren

```sh
npm i -D typescript @types/node
```

`@types/react` und `@types/react-dom` sind im Vite-React-Template schon dabei. Falls nicht: `npm i -D @types/react @types/react-dom`.

React Router, Tailwind und daisyUI bringen ihre Typen selbst mit, dafür brauchst du nichts zu installieren.

## 2. `package.json`: Typprüfung in den Build einbauen

```json
"scripts": {
  "build": "tsc -b && vite build",
  "typecheck": "tsc -b"
}
```

Vite selbst prüft keine Typen, es entfernt sie nur. Erst `tsc -b` meldet Typfehler.

## 3. Drei tsconfig-Dateien anlegen

Kopiere `tsconfig.json`, `tsconfig.app.json` und `tsconfig.node.json` aus diesem Ordner. `tsconfig.json` verweist nur auf die beiden anderen: `tsconfig.app.json` gilt für `src/`, `tsconfig.node.json` für `vite.config.ts`.

Der entscheidende Teil für die schrittweise Portierung steht in `tsconfig.app.json`:

```json
"allowJs": true,
"checkJs": false,
```

`allowJs` erlaubt JS-Dateien im TypeScript-Projekt, `checkJs: false` lässt sie ungeprüft. Wenn alles portiert ist, löschst du beide Zeilen.

## 4. `vite.config.js` in `vite.config.ts` umbenennen

Der Inhalt bleibt gleich.

## 5. Imports ohne Dateiendung schreiben

```js
import App from './App.jsx'; // vorher
import App from './App'; // nachher
```

Sonst bricht jedes Umbenennen von `.jsx` zu `.tsx` die Imports in anderen Dateien.

## 6. Linter: TypeScript-Plugin aktivieren

In `.oxlintrc.json`:

```json
"plugins": ["react", "typescript", "oxc"]
```

## 7. Prüfen

```sh
npm run typecheck
npm run build
```

Beides muss jetzt fehlerfrei laufen, obwohl noch keine einzige Datei portiert ist.

Später beim Portieren von `main.jsx` musst du den Pfad in `index.html` anpassen: `/src/main.tsx`.

## Abkürzung: Konfiguration aus dem Vite-Template holen

Vite kann TypeScript nicht nachträglich in ein bestehendes Projekt einbauen. Kopiere die configs aus einem anderen Vite/TS-Projekt.

Danach trägst du in `tsconfig.app.json` noch `allowJs` und `checkJs` ein (Schritt 3). In `vite.config.ts` ergänzt du die Plugins aus deiner alten `vite.config.js`, hier `tailwindcss()`. Die Schritte 1, 2, 5 und 6 brauchst du weiterhin.
