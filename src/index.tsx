import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import { apiRoutes } from "./api";

const app = new Hono();

app.route("/api", apiRoutes);

app.get("*", (c) => {
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            rel="stylesheet"
            href="https://cdn.simplecss.org/simple.min.css"
          />
          {import.meta.env.PROD ? (
            <script type="module" src="/static/web/index.js"></script>
          ) : (
            <script type="module" src="/src/web/index.tsx"></script>
          )}
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  );
});

export default app;
