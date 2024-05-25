import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';
import { hc } from 'hono/client';
import type { AppRoutes } from '@/index';

const App = () => (
  <>
    <h1>Hello, Hono with React!</h1>
    <h2>Example of useState()</h2>
    <Counter />
    <h2>Example of API fetch()</h2>
    <ClockButton />
  </>
);

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      You clicked me {count} times
    </button>
  );
};

const ClockButton = () => {
  const [response, setResponse] = useState<string | null>(null);

  const handleClick = async () => {
    const client = hc<AppRoutes>('http://localhost:5173/api');
    const response = await client.health.$get();
    const data = await response.json();
    const headers = Array.from(response.headers.entries()).reduce(
      (acc, [key, value]) => Object.assign(acc, { [key]: value }),
      {},
    );
    const fullResponse = {
      url: response.url,
      status: response.status,
      headers,
      body: data,
    };

    setResponse(JSON.stringify(fullResponse, null, 2));
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Get Server Time
      </button>
      {response && <pre>{response}</pre>}
    </div>
  );
};

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const domNode = document.getElementById('root')!;
const root = createRoot(domNode);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
