import { getAuth } from '@hono/oidc-auth';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { authApi } from './auth';

const app = new Hono().use(
  secureHeaders(),
  cors({ origin: 'http://localhost:5173' }),
);

export const apiRoutes = app
  .get('/health', (c) => c.json({ status: 200 }))
  .route('/auth', authApi)
  .get('/me', async (c) => {
    const auth = await getAuth(c);

    return c.json(auth);
  });

export type ApiRoutes = typeof apiRoutes;
