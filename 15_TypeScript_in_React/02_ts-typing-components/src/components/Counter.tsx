// components/Counter.tsx
// This component should receive an `initialCount` number prop
// Pass that initial count as the initial value of a piece of state called count
// Render buttons to increase, decrease and reset

import { useState } from 'react';

const Counter = ({ initialCount }: { initialCount: number }) => {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      <p>Initial count: {count}</p>

      <button onClick={() => setCount((c) => c + 1)} type='button'>
        Increase
      </button>
      <button onClick={() => setCount((c) => c - 1)} type='button'>
        Decrease
      </button>
      <button onClick={() => setCount(initialCount)} type='button'>
        Reset
      </button>
    </>
  );
};

export default Counter;
