import { renderToString } from 'react-dom/server';
import { Hono } from 'hono';
import { apiRoutes } from '@/api';

const app = new Hono();

app.route('/api', apiRoutes);

const SwitchScript = () => import.meta.env.PROD
  ? (
      <script src="/static/web/index.js" type="module" />
    )
  : (
      <script src="/src/web/index.tsx" type="module" />
    );

app.get('*', (c) =>
  c.html(
    renderToString(
      <html lang="ja">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            href="https://cdn.simplecss.org/simple.min.css"
            rel="stylesheet"
          />
          <SwitchScript />
        </head>
        <body>
          <div id="root" />
        </body>
      </html>,
    ),
  ),
);

export default app;
