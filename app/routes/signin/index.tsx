import { googleAuth } from '@hono/oauth-providers/google';
import { setCookie } from 'hono/cookie';
import { createRoute } from 'honox/factory';
import { v4 as uuidv4 } from 'uuid';

export default createRoute(
  (c, next) =>
    googleAuth({
      client_id: c.env.GOOGLE_ID,
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
