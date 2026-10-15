# Übung: Todo-App nach TypeScript portieren

Die Todo-App aus „Thinking in React“ ist in JavaScript geschrieben. Deine Aufgabe ist es, TypeScript einzubinden und das Projekt danach Datei für Datei zu portieren. Die App soll dabei die ganze Zeit lauffähig bleiben.

## Setup

```sh
npm install
npm run dev
```

## Teil 1: TypeScript einbinden

Am Ende dieses Teils ist noch keine Datei portiert, aber `npm run typecheck` und `npm run build` laufen schon fehlerfrei.

### 1. Pakete installieren

```sh
npm i -D typescript @types/node
```

`@types/react` und `@types/react-dom` sind schon installiert. Tailwind bringt seine Typen selbst mit.

### 2. Konfiguration aus dem Vite-Template holen

Vite kann TypeScript nicht nachträglich in ein bestehendes Projekt einbauen. Kopiere die drei Dateien `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` aus einem anderen Vite/TS-Projekt.

`tsconfig.json` verweist nur auf die anderen beiden. `tsconfig.app.json` gilt für alles in `src/`, `tsconfig.node.json` für `vite.config.ts`.

### 3. `vite.config.js` anpassen

Ändere die Dateiendung, um TypeScript mit Vite zu verwenden. xD

### 4. JavaScript und TypeScript nebeneinander erlauben

Ergänze in `tsconfig.app.json` unter `compilerOptions`:

```json
"allowJs": true,
"checkJs": false,
```

`allowJs` erlaubt `.js`/`.jsx`-Dateien im TypeScript-Projekt, `checkJs: false` lässt sie ungeprüft. So prüft TypeScript nur die Dateien, die du schon portiert hast.

### 5. `package.json`: Typprüfung in den Build einbauen

```json
"build": "tsc -b && vite build",
"typecheck": "tsc -b",
```

Vite selbst prüft keine Typen, es entfernt sie nur. `tsc -b` meldet Typfehler.

### 6. Linter: TypeScript-Plugin aktivieren

In `.oxlintrc.json`:

```json
"plugins": ["react", "typescript", "oxc"]
```

### 7. Import ohne Dateiendung

In `src/main.jsx`:

```js
import App from './App.jsx'; // vorher
import App from './App'; // nachher
```

Sonst zeigt der Import ins Leere, sobald du `App.jsx` in `App.tsx` umbenennst.

### 8. Prüfen

```sh
npm run typecheck
npm run build
npm run dev
```

## Teil 2: Datei für Datei portieren

Benenne eine Datei von `.jsx` in `.tsx` um, gib ihr Typen und prüfe mit `npm run typecheck`. Erst wenn keine Fehler mehr kommen, nimmst du dir die nächste Datei vor.

1. Portiere `main.jsx`: Was gibt `document.getElementById` zurück, wenn es das Element nicht findet? Ändere außerdem den Pfad in `index.html`.
2. Lege `src/types.ts` an mit einem Typ `Todo` und einem Typ `Filter` für die drei Filterwerte.
3. Portiere `ToDoItem` und `ToDoList`: Welche Props bekommen sie, und welchen Typ hat `toggleTodo`?
4. Portiere `FilterComponent`.
5. Portiere `AddToDo`: `setTodos` wird mit einer Funktion `(prevTodos) => ...` aufgerufen. Ein einfacher Funktionstyp reicht hier nicht. Welchen Typ hat der Setter, den `useState` zurückgibt?
6. Portiere `App`: Gib beiden `useState` einen Typparameter. Warum beschwert sich TypeScript über `JSON.parse(localStorage.getItem('todos'))`?
7. Wenn keine `.jsx`-Datei mehr übrig ist: Entferne `allowJs` und `checkJs` aus `tsconfig.app.json`.

Tipp: Wenn du eine Komponente portierst, deren Eltern noch `.jsx` sind, meldet TypeScript falsche Props noch nicht – die Aufrufer werden ja nicht geprüft. Spätestens beim Portieren von `App` fällt dann alles auf.
