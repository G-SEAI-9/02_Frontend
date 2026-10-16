import { createContext, useContext, useReducer } from 'react';

type BookingState = {
  count: number;
  destinations: string[];
  premium: boolean;
};

type BookingContextValue = {
  bookingCount: number;
  bookedDestinations: string[];
  addDestination: (dest: string) => void;
  removeDestination: (dest: string) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

const initalState: BookingState = {
  count: 0,
  destinations: [],
  premium: false,
};

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

function reducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'add_booking': {
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
      action.payload.newText;
      return state;
    }
    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
}

export default function BookingContextProvider({ children }: { children: React.ReactNode }) {
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
    <BookingContext value={{ bookingCount, bookedDestinations, addDestination, removeDestination }}>
      {children}
    </BookingContext>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used withing the <BookingContextProvider>');
  return context;
}
