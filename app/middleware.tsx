import { findUserByUserId, getSession, getSessionCookie } from '@/features/user';
import type { Env, MiddlewareHandler } from 'hono';

export const authorize: MiddlewareHandler<Env> = async (c, next) => {
  const sessionId = await getSessionCookie(c);
  if (!sessionId) {
    return c.render(
      <>
        <h1>You are Unauthorized! Please sign in.</h1>
        <p>middlewre session not found</p>
        <a href="/signin">
          <button type="button">サインインする</button>
        </a>
      </>,
      { title: 'Unauthorized!' },
    );
  }
  const userId = await getSession(c.env.KV, sessionId);
  if (!userId) {
    return c.render(
      <>
        <h1>You are Unauthorized! Please sign in.</h1>
        <p>middlewre user id not found</p>
        <a href="/signin">
          <button type="button">サインインする</button>
        </a>
      </>,
      { title: 'Unauthorized!' },
    );
  }
  if (!c.get('user')) {
    const foundUser = await findUserByUserId(c.env.D1, userId);
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    c.set('user', foundUser!);
  }

  await next();
};
