import UserList from './UserList';
import { test, describe, vi, expect, beforeEach, afterEach } from 'vitest';
import type { Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

// Feste Testdaten statt der echten API: Wir wissen genau, welche Namen erscheinen müssen,
// und der Test funktioniert auch offline und wenn die API ihre Daten ändert.
const mockUsers = [
  { id: 1, name: 'Ada Lovelace', username: 'ada', email: 'ada@algo.dev' },
  { id: 2, name: 'Alan Turing', username: 'turing', email: 'alan@machine.uk' },
];

beforeEach(() => {
  // vi.stubGlobal ersetzt das globale fetch durch unsere eigene Version.
  // Die Komponente ruft weiter ganz normal fetch() auf – merkt aber nicht, dass es ein Fake ist.
  vi.stubGlobal(
    'fetch',
    // vi.fn() erzeugt eine Mock-Funktion. mockResolvedValue sorgt dafür, dass sie
    // eine Promise zurückgibt, die sich mit diesem Objekt auflöst – wie ein echtes fetch.
    vi.fn().mockResolvedValue({
      // fake fetch-Ergebnis: nur die Teile der Response, die UserList wirklich benutzt
      ok: true,
      json: () => Promise.resolve(mockUsers),
    }),
  );
});

// Nach jedem Test das echte fetch wiederherstellen
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('UserList', () => {
  test('renders user name', async () => {
    render(<UserList />);

    // Die Daten kommen asynchron (useEffect + fetch). Direkt nach render() zeigt die
    // Komponente noch "Loading...". waitFor wiederholt die Prüfung so lange,
    // bis sie klappt (oder ein Timeout erreicht ist).
    await waitFor(() => {
      // getByRole('cell') findet Tabellenzellen (<td>) – so, wie ein Screenreader sie sieht
      const userElement = screen.getByRole('cell', { name: /ada lovelace/i });
      expect(userElement).toBeInTheDocument();
    });

    // Aufräumen
  });

  // test('Aufräumen nötig', async () => {
  //   render(<UserList />);

  //   await waitFor(() => {
  //     const userElement = screen.getByRole('cell', { name: /Leanne Graham/i });
  //     expect(userElement).toBeInTheDocument();
  //   });
  // });

  test('shows an error state on network failure', async () => {
    // Nur für diesen einen Aufruf liefert fetch eine fehlgeschlagene Antwort (ok: false).
    // "Once" heißt: danach gilt wieder das Standardverhalten aus beforeEach.
    // "as Mock" sagt TypeScript, dass fetch hier unsere Mock-Funktion ist (sonst kennt TS mockResolvedValueOnce nicht).
    (globalThis.fetch as Mock).mockResolvedValueOnce({ ok: false });

    render(<UserList />);

    await waitFor(() => {
      const errorEl = screen.getByText(/failed to fetch users/i);
      expect(errorEl).toBeInTheDocument();
    });
  });
});
