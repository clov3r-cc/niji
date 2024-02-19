import { uuidv4 } from '@/lib';
import type { Context, Env } from 'hono';
import { deleteCookie, getSignedCookie, setSignedCookie } from 'hono/cookie';

const cookieName = '__session';

const generateSessionId = () => `session_${uuidv4()}`;

const verifyCookieSecret = (value?: string) => {
  if (!value) {
    throw new Error('The secret value for cookie to store session id is not defined!');
  }

  return value;
};

export const getSessionCookie = async (c: Context<Env>) => {
  const value = await getSignedCookie(c, verifyCookieSecret(c.env.SESSION_COOKIE_SECRET), cookieName);
  const isSigned = typeof value !== 'boolean';

  return isSigned ? value : undefined;
};

// TODO: Domain to cookie option

export const setSessionCookie = async (c: Context<Env>, expiresIn: number) => {
  const sessionId = generateSessionId();
  const secret = verifyCookieSecret(c.env.SESSION_COOKIE_SECRET);

  await setSignedCookie(c, cookieName, sessionId, secret, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    maxAge: expiresIn,
    path: '/',
  });

  return sessionId;
};

export const clearSessionCookie = (c: Context<Env>) =>
  deleteCookie(c, cookieName, {
    secure: true,
    path: '/',
  });
