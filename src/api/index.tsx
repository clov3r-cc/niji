import { getAuth, oidcAuthMiddleware } from '@hono/oidc-auth';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';
import { authApi } from './auth';

const app = new Hono().use(secureHeaders());

// CORS
app.use(async (c, next) => {
  const handler = cors({
    // TODO: use env
    origin: 'http://localhost:5173',
    // 10 minutes
    maxAge: 60 * 10,
    credentials: true,
  });

  return handler(c, next);
});

// CSRF
app.use(async (c, next) => {
  const handler = csrf({
    // TODO: use env
    origin: 'http://localhost:5173',
  });

  return handler(c, next);
});

export const apiRoutes = app
  .get('/health', (c) => c.json({ status: 200 }))
  .route('/auth', authApi)
  .use(oidcAuthMiddleware())
  .get('/me', async (c) => {
    const auth = await getAuth(c);

    return c.json(auth);
  });

export type ApiRoutes = typeof apiRoutes;
