import Counter from './Counter';
import { describe, expect, it, test } from 'vitest';
// render: zeichnet eine Komponente in ein simuliertes DOM (jsdom, siehe vite.config.ts)
// screen: Zugriff auf dieses DOM – darüber suchen wir Elemente wie ein Nutzer
// fireEvent: löst Browser-Events (z.B. click) auf einem Element aus
import { fireEvent, render, screen } from '@testing-library/react';

test('ein erster Test', () => {
  // Arrange/Act
  // render() hängt <Counter /> ins DOM. Den Rückgabewert brauchen wir meist nicht,
  // weil wir über `screen` auf das gerenderte DOM zugreifen.
  const result = render(<Counter />);
  // getByRole sucht nach der Rolle eines Elements (h1–h6 = 'heading') und seinem
  // sichtbaren Namen. So suchen auch Screenreader – der Test prüft also gleich die Barrierefreiheit mit.
  // getBy... wirft einen Fehler, wenn nichts gefunden wird → der Test schlägt sofort fehl.
  const heading = screen.getByRole('heading', { name: /counter component/i });

  // queryBy... gibt null zurück statt einen Fehler zu werfen.
  // Deshalb nehmen wir queryBy, wenn wir prüfen wollen, dass etwas _nicht_ da ist.
  const oldHeading = screen.queryByRole('heading', { name: /old test component/i });

  // Assert
  // toBeInTheDocument() kommt aus jest-dom (eingebunden in vitest.setup.ts)
  expect(heading).toBeInTheDocument();
  expect(oldHeading).not.toBeInTheDocument();
});

describe('Counter Component', () => {
  test('renders with initial value of 0', () => {
    render(<Counter />);
    // getByText sucht ein Element, dessen Text exakt '0' ist
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('rendes with initial value', () => {
    const INITI_VAL = 42;
    // Props übergeben wir wie in der App – so testen wir verschiedene Ausgangszustände
    render(<Counter initialValue={INITI_VAL} />);
    expect(screen.getByText(INITI_VAL)).toBeInTheDocument();
  });

  test('renders all three buttons', () => {
    render(<Counter />);
    // Der "name" eines Buttons ist sein sichtbarer Text.
    // Ein String muss exakt passen, ein RegEx mit /i ignoriert Groß-/Kleinschreibung.
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
  });

  test('render notification when counter at 0', () => {
    render(<Counter initialValue={0} />);
    // Bedingtes Rendering testen: Der Hinweis erscheint nur bei count === 0
    expect(screen.getByText(/counter is at zero!/i)).toBeInTheDocument();
  });
});

// Ab hier testen wir Verhalten: Nutzer klickt → Zustand ändert sich → DOM zeigt neuen Wert
describe('Counter Component Functionality', () => {
  test('increments counter when + button is clicked', () => {
    render(<Counter />);
    const plusBtn = screen.getByRole('button', { name: '+' });
    // fireEvent.click simuliert einen Klick. React aktualisiert den State
    // und rendert neu, bevor die nächste Zeile ausgeführt wird.
    fireEvent.click(plusBtn);
    fireEvent.click(plusBtn);
    fireEvent.click(plusBtn);
    fireEvent.click(plusBtn);
    fireEvent.click(plusBtn);

    const counterEl = screen.queryByText('5');
    expect(counterEl).toBeInTheDocument();
  });

  test('decrements counter when - button is clicked', () => {
    // Arrange
    render(<Counter initialValue={5} />);
    const decrementBtn = screen.getByRole('button', { name: '-' });
    // Act
    fireEvent.click(decrementBtn);
    fireEvent.click(decrementBtn);
    // Assert
    // Wir prüfen nur, was der Nutzer sieht – nicht den internen State der Komponente
    expect(screen.getByText('3')).toBeInTheDocument();
  });
  test('resets counter to initial value when reset button is clicked', () => {
    // Arrange
    render(<Counter initialValue={3} />);
    const incrementBtn = screen.getByRole('button', { name: '+' });
    const resetBtn = screen.getByRole('button', { name: /reset/i });
    // Act
    // Erst den Wert verändern, damit der Reset überhaupt etwas zu tun hat
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    fireEvent.click(resetBtn);
    // Assert
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});

describe('Counter Component Button States', () => {
  test('minus button is disablew when count at 0', () => {
    render(<Counter initialValue={0} />);
    const minusBtn = screen.getByRole('button', { name: '-' });
    // toBeDisabled() prüft das disabled-Attribut des Buttons
    expect(minusBtn).toBeDisabled();
  });
});
