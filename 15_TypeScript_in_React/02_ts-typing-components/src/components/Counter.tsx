// components/Counter.tsx
// This component should receive an `initialCount` number prop
// Pass that initial count as the initial value of a piece of state called count
// Render buttons to increase, decrease and reset
const Counter = ({ initialCount }) => {
  return <p>Initial count: {initialCount}</p>;
};

export default Counter;
