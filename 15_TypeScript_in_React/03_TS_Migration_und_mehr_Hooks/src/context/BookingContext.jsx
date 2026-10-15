import { createContext, useContext, useReducer } from 'react';

const BookingContext = createContext();

const initalState = {
  count: 0,
  destinations: [],
  premium: false,
};

function reducer(state, action) {
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
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export default function BookingContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);

  function addDestination(dest) {
    dispatch({ type: 'add_booking', payload: dest });
  }
  function removeDestination(dest) {
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
  return useContext(BookingContext);
}
