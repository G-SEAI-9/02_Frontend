# Übung: React Router – Travel Agency

Die Travel Agency hat schon alle Seiten als Komponenten in `src/pages/`, aber noch kein Routing. Aktuell zeigt `App.jsx` immer nur die Startseite (`Home`), egal welche URL im Browser steht. Deine Aufgabe ist es, [React Router](https://reactrouter.com/) einzubauen.

## Setup

```sh
git clone git@github.com:G-SEAI-9/React-Router-Uebung.git

cd React-Router-Uebung

rm -fr .git

npm install
npm run dev
```

## Seiten und URLs

| URL                   | Komponente          |
| --------------------- | ------------------- |
| `/`                   | `Home`              |
| `/about`              | `About`             |
| `/destinations`       | `Destinations`      |
| `/destinations/:slug` | `SingleDestination` |
| `/contact`            | `Contact`           |
| alles andere          | `NotFound`          |

Die Reisedaten werden einmal in `App.jsx` aus `public/travel.json` geladen. `Home`, `Destinations` und `SingleDestination` brauchen diese Daten.

## Aufgaben

1. Installiere React Router (`npm i react-router`) und richte den Router in `src/main.jsx` ein.
2. Lege die Routen aus der Tabelle an. Navbar, Footer und der Ladezustand sollen auf jeder Seite erhalten bleiben – verschiebe dieses Grundgerüst aus `App.jsx` in eine Layout-Komponente (z. B. `src/layouts/MainLayout.jsx`) und nutze `<Outlet />`.
3. Gib die geladenen Reisedaten über den Outlet an die Seiten weiter und lies sie dort mit `useOutletContext()` aus, statt sie als Prop zu übergeben.
4. Ersetze die `<a>`-Tags in `NavBar`, `Footer` und `DestinationCard` durch `Link` bzw. `NavLink`, damit die Seite beim Klicken nicht neu lädt.
5. Markiere in der Navbar den aktiven Link, z. B. mit den Klassen `underline underline-offset-2`.
6. `SingleDestination` zeigt immer Berlin. Lies den `slug` mit `useParams()` aus der URL.
7. Erledige die übrigen `TODO`s mit `useNavigate()`:
   - Das Suchformular in `Home` soll nach dem Absenden zu `/destinations` wechseln.
   - Der „Go back“-Button in `NotFound` soll eine Seite zurück navigieren.
8. Deployt das Projekt bei Render oder Netlify. Achtet auch die Rewrite-Regeln für das korrekte Routing.

Tipp: Suche im Projekt nach `TODO`, um alle Stellen zu finden.
