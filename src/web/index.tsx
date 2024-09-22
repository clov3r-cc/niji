import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const App = () => (
  <>
    <h1>Hello, Hono with React!</h1>
    <h2>Example of useState()</h2>
    <p>Thanks for your coming!</p>
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const domNode = document.getElementById('root')!;
const root = createRoot(domNode);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
