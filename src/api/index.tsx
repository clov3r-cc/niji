import { getAuth, oidcAuthMiddleware } from '@hono/oidc-auth';
import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';
import { authApi } from './auth';

type Env = {
  FRONTEND_ORIGIN: string;
};

const app = new Hono<{ Bindings: Env }>().use(secureHeaders());

// CORS
app.use(async (c, next) => {
  const { FRONTEND_ORIGIN } = env(c);
  const handler = cors({
    origin: FRONTEND_ORIGIN,
    // 10 minutes
    maxAge: 60 * 10,
    credentials: true,
  });

  return handler(c, next);
});

// CSRF
app.use(async (c, next) => {
  const { FRONTEND_ORIGIN } = c.env;
  const handler = csrf({
    origin: FRONTEND_ORIGIN,
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
