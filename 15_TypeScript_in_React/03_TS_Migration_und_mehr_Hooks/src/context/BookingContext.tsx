import { createContext, useContext, useReducer } from 'react';

// Der State, den der Reducer intern verwaltet.
type BookingState = {
  count: number;
  destinations: string[];
  premium: boolean;
};

// Das, was Komponenten über useBooking() bekommen – die "öffentliche Schnittstelle" des Contexts.
// Funktionen werden mit ihrer Signatur typisiert: Parameter rein, Rückgabe raus.
// 'void' heißt: die Funktion gibt nichts zurück, das man verwenden könnte.
type BookingContextValue = {
  bookingCount: number;
  bookedDestinations: string[];
  addDestination: (dest: string) => void;
  removeDestination: (dest: string) => void;
};

// createContext ist generisch: in <...> sagen wir TypeScript, welchen Wert der Context transportiert.
// '| null', weil wir beim Erzeugen noch keinen echten Wert haben – den liefert erst der Provider.
// Ohne Typangabe würde TS aus 'null' den Typ 'null' ableiten, und der Context wäre nutzlos.
const BookingContext = createContext<BookingContextValue | null>(null);

// Mit ': BookingState' prüft TS, dass der Startwert genau zur State-Form passt.
const initalState: BookingState = {
  count: 0,
  destinations: [],
  premium: false,
};

// Eine "Discriminated Union": Jede Action ist eines dieser Objekte.
// Das Feld 'type' ist der Unterscheider – je nach 'type' weiß TS, wie 'payload' aussieht.
// Tippfehler wie type: 'add_bookin' oder ein falscher payload fallen so sofort auf.
type BookingAction =
  | {
      type: 'add_booking';
      payload: string;
    }
  | {
      type: 'remove_booking';
      payload: string;
    }
  | {
      type: 'edit_booking';
      payload: {
        id: number;
        newText: string;
      };
    };

// Der Reducer bekommt den aktuellen State und eine Action und gibt den neuen State zurück.
// Die Typen der Parameter und der Rückgabe sind der Vertrag, den useReducer später überprüft.
function reducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'add_booking': {
      // Innerhalb dieses case weiß TS: action.payload ist ein string ("Narrowing").
      const newState = { ...state };
      const destinations = [...state.destinations, action.payload];
      newState.destinations = destinations;
      newState.count++;

      newState.premium = newState.count > 5;

      return newState;
    }
    case 'remove_booking': {
      const newState = { ...state };
      newState.destinations = newState.destinations.filter((d) => d !== action.payload);
      newState.count--;
      newState.premium = newState.count > 5;
      return newState;
    }
    case 'edit_booking': {
      // Hier ist action.payload ein Objekt { id, newText } – TS bietet passendes Autocomplete an.
      action.payload.newText;
      return state;
    }
    default:
      // Sind alle Action-Typen oben behandelt, kann dieser Fall laut TS nie eintreten.
      // Zur Laufzeit (z. B. bei Daten aus JS-Code) fangen wir ihn trotzdem ab.
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
}

// React.ReactNode ist alles, was React rendern kann (JSX, Text, null, Arrays ...).
export default function BookingContextProvider({ children }: { children: React.ReactNode }) {
  // useReducer leitet alle Typen aus 'reducer' und 'initalState' ab:
  // 'state' ist BookingState, 'dispatch' akzeptiert nur gültige BookingActions.
  const [state, dispatch] = useReducer(reducer, initalState);

  function addDestination(dest: string) {
    dispatch({ type: 'add_booking', payload: dest });
  }
  function removeDestination(dest: string) {
    dispatch({ type: 'remove_booking', payload: dest });
  }

  const bookingCount = state.count;
  const bookedDestinations = state.destinations;

  return (
    // TS prüft, dass 'value' exakt zu BookingContextValue passt – fehlt ein Feld, gibt es einen Fehler.
    <BookingContext value={{ bookingCount, bookedDestinations, addDestination, removeDestination }}>
      {children}
    </BookingContext>
  );
}

// Eigener Hook als Zugang zum Context.
export function useBooking() {
  // Hier ist 'context' vom Typ BookingContextValue | null.
  const context = useContext(BookingContext);
  // Nach dieser Prüfung weiß TS: 'context' ist nicht mehr null.
  // So müssen Komponenten nicht selbst auf null prüfen oder '!' verwenden.
  if (!context) throw new Error('useBooking must be used withing the <BookingContextProvider>');
  return context;
}
