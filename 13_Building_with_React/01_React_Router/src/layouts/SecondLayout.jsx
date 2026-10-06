import { Outlet } from 'react-router';

export default function SecondLayout() {
  return (
    <div>
      <h1>Second layout</h1>

      {/* Hier erscheint die Kindroute (in App.jsx: die 404-Meldung) */}
      <Outlet />
    </div>
  );
}
