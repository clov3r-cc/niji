import type { Env, MiddlewareHandler } from 'hono';
import { getCookie } from 'hono/cookie';

export const authorize: MiddlewareHandler<Env> = async (c, next) => {
  const sessionId = getCookie(c, '__session');
  if (!sessionId) {
    return c.render(
      <>
        <h1>You are Unauthorized! Please sign in.</h1>
        <p>middlewre session not found</p>
      </>,
      { title: 'Unauthorized!' },
    );
  }
  const userId = await c.env.KV.get(sessionId);
  if (!userId) {
    return c.render(
      <>
        <h1>You are Unauthorized! Please sign in.</h1>
        <p>middlewre user id not found</p>
      </>,
      { title: 'Unauthorized!' },
    );
  }
  c.set('userId', userId);

  await next();
};
