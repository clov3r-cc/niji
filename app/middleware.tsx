import { getSession, getSessionCookie } from '@/features/user';
import { eq } from 'drizzle-orm';
import type { Env, MiddlewareHandler } from 'hono';
import { usersTable } from './dbSchema';
import { DB } from './lib';

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
    const foundUsers = await DB(c.env.D1).select().from(usersTable).where(eq(usersTable.userId, userId)).limit(1);
    c.set('user', foundUsers[0]);
  }

  await next();
};
