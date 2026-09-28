// Counter2 hat keinen eigenen State. count und setCount kommen als Props von App.
// Die Komponente ist also nur "Anzeige + Buttons" für einen State, der woanders lebt.
export default function Counter2({ count, setCount }) {
  return (
    <div className='text-3xl'>
      <h2>Counter</h2>

      {/* setCount ist die Setter-Funktion aus App. Der Aufruf ändert also den State in App,
          App rendert neu und gibt den neuen count wieder als Prop hier herein. */}
      <button className='px-4 cursor-pointer' type='button' onClick={() => setCount((c) => c - 1)}>
        -
      </button>

      <span>{count}</span>

      <button className='px-4 cursor-pointer' type='button' onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
}
