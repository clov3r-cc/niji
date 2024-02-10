import { useState } from 'hono/jsx';

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)} type="button">
        Increment
      </button>
    </>
  );
};
