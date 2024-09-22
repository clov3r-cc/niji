import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Hello, Hono with React!</h1>
      <h2>Example of useState()</h2>
      <p>Thanks for your coming!</p>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
