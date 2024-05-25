import { Hono } from 'hono';
import { renderToString } from 'react-dom/server';
import apiApp from './api';

const app = new Hono<{ Bindings: { MY_VAR: string } }>();

app.route('/api', apiApp);

app.get('*', (c) =>
  c.html(
    renderToString(
      <html lang="ja">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            rel="stylesheet"
            href="https://cdn.simplecss.org/simple.min.css"
          />
          {import.meta.env.PROD ? (
            <script type="module" src="/static/client.js" />
          ) : (
            <script type="module" src="/src/web/index.tsx" />
          )}
        </head>
        <body>
          <div id="root" />
        </body>
      </html>,
    ),
  ),
);

export default app;
