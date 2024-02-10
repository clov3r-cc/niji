import { googleAuth } from '@hono/oauth-providers/google';
import { Hono, type MiddlewareHandler } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { v4 as uuidv4 } from 'uuid';
import type { Env } from './types';

const app = new Hono<Env>();

app.get(
  '/signin/google',
  (c, next) =>
    googleAuth({
      // biome-ignore lint/style/useNamingConvention: <explanation>
      client_id: c.env.GOOGLE_ID,
      // biome-ignore lint/style/useNamingConvention: <explanation>
      client_secret: c.env.GOOGLE_SECRET,
      scope: ['openid', 'profile'],
    })(c, next),
  async (c) => {
    const token = c.get('token');
    const user = c.get('user-google');

    if (!(token && user)) {
      return c.text('Failed to get the user info', 500);
    }

    const sessionId = uuidv4();
    setCookie(c, '__session', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: token.expires_in,
      path: '/',
    });
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    await c.env.SESSION.put(sessionId, user.id!, {
      expirationTtl: token.expires_in,
    });

    return c.redirect('/', 302);
  },
);

const authorize: MiddlewareHandler<Env> = async (c, next) => {
  const sessionId = getCookie(c, '__session');
  if (!sessionId) {
    return c.text('Unauthorized', 401);
  }
  const userId = await c.env.SESSION.get(sessionId);
  if (!userId) {
    return c.text('Unauthorized', 401);
  }
  c.set('userId', userId);

  await next();
};

app.get('/', authorize, (c) => {
  const sessionId = getCookie(c, '__session');

  if (!sessionId) {
    return c.text('Unauthorized', 401);
  }

  const userId = c.get('userId');
  return c.text(`Hello, ${userId}`, 200);
});

app.get('/signout', (c) =>
  c.html(
    `<form action="/signout" method="POST">
      <input type="submit" value="送信" />
    </form>`,
  ),
);

app.post('/signout', authorize, (c) => {
  // biome-ignore lint/style/noNonNullAssertion: the id has already verified by middleware
  const sessionId = getCookie(c, '__session')!;

  setCookie(c, '__session', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: -60,
    path: '/',
  });
  c.env.SESSION.delete(sessionId);

  return c.text('Singed out!', 200);
});

// biome-ignore lint/style/noDefaultExport: <explanation>
export default app;
