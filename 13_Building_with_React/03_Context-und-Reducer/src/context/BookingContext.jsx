import { createContext, useContext, useReducer } from 'react';

// Ein eigener Context nur für Buchungen – getrennt vom ThemeContext,
// damit jede Komponente nur das abonniert, was sie wirklich braucht.
const BookingContext = createContext();

// Startwert für useReducer: der gesamte Buchungs-State in einem Objekt.
const initalState = {
  count: 0,
  destinations: [],
  premium: false,
};

// Der Reducer ist eine reine Funktion: (alter State, Action) => neuer State.
// Statt mehrerer setXY-Aufrufe beschreibt eine Action nur, WAS passiert ist
// ("add_booking"), und der Reducer entscheidet zentral, WIE sich der State ändert.
function reducer(state, action) {
  switch (action.type) {
    case 'add_booking': {
      // Flache Kopie des States anlegen – React erkennt Änderungen nur an einem neuen Objekt.
      const newState = { ...state };
      const destinations = [...state.destinations, action.payload];
      newState.destinations = destinations;
      newState.count++;

      // Abgeleiteter Wert: wird bei jeder Änderung neu berechnet.
      // (Ist hier nur ein konstruiertes Beispiel. useReducer wird da sinnvoll, wo ein Update mehrere Auswirkungen gleichzeitig haben soll)
      newState.premium = newState.count > 5;

      return newState;
    }
    case 'remove_booking': {
      const newState = { ...state };
      // filter() liefert ein neues Array ohne das entfernte Ziel.
      newState.destinations = newState.destinations.filter((d) => d !== action.payload);
      newState.count--;
      newState.premium = newState.count > 5;
      return newState;
    }
    // Der default ist hier ein Fehler durch uns als Entwickler,
    // wenn wir uns vertippt haben, oder eine nicht mehr existente Action
    // aufrufen.
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export default function BookingContextProvider({ children }) {
  // const [bookingCount, setBookingCount] = useState(0);

  // useReducer liefert wie useState ein Paar: den aktuellen State und
  // dispatch – die Funktion, mit der wir dem Reducer eine Action schicken.
  const [state, dispatch] = useReducer(reducer, initalState);

  // Kleine Hilfsfunktionen, damit Komponenten keine Action-Objekte
  // kennen müssen, sondern einfach addDestination('rom') aufrufen.
  function addDestination(dest) {
    dispatch({ type: 'add_booking', payload: dest });
  }
  function removeDestination(dest) {
    dispatch({ type: 'remove_booking', payload: dest });
  }

  const bookingCount = state.count;
  const bookedDestinations = state.destinations;

  // Alles in value ist für jede Komponente innerhalb von <BookingContextProvider> erreichbar.
  return (
    <BookingContext value={{ bookingCount, bookedDestinations, addDestination, removeDestination }}>
      {children}
    </BookingContext>
  );
}

// Custom Hook: Komponenten schreiben useBooking() statt useContext(BookingContext)
// und müssen das Context-Objekt selbst nicht importieren.
export function useBooking() {
  return useContext(BookingContext);
}
