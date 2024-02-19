import { usersTable } from '@/dbSchema';
import { DB, uuidv4 } from '@/lib';
import { googleAuth } from '@hono/oauth-providers/google';
import { eq } from 'drizzle-orm';
import { setCookie } from 'hono/cookie';
import { createRoute } from 'honox/factory';

const storeProfileIcon = async (bucket: R2Bucket, userId: string, url?: string) => {
  if (!url) {
    return undefined;
  }
  const data = await fetch(url).then((v) => v.arrayBuffer());
  const key = `profile-icon/${userId}`;

  return bucket.put(key, data).then((obj) => obj?.key);
};

export default createRoute(
  (c, next) =>
    googleAuth({
      client_id: c.env.GOOGLE_ID,
      client_secret: c.env.GOOGLE_SECRET,
      scope: ['openid', 'profile'],
    })(c, next),
  async (c) => {
    const token = c.get('token');
    const googleUser = c.get('user-google');
    const googleUserId = googleUser?.id;
    const googleUserName = googleUser?.name;

    if (!(token && googleUser && googleUserId && googleUserName)) {
      return c.text('Failed to get the user info', 500);
    }

    const sessionId = `session_${uuidv4()}`;
    setCookie(c, '__session', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: token.expires_in,
      path: '/',
    });

    const db = DB(c.env.D1);
    const foundUsers = await db
      .select({ userId: usersTable.userId })
      .from(usersTable)
      .where(eq(usersTable.googleAccountId, googleUserId));
    const isNewUser = foundUsers.length === 0;
    const userId = isNewUser ? uuidv4() : foundUsers[0].userId;
    if (isNewUser) {
      const profileIconKey = await storeProfileIcon(c.env.R2, userId, googleUser.picture);

      c.executionCtx.waitUntil(
        db
          .insert(usersTable)
          .values({
            userId: userId,
            name: googleUserName,
            profileIconKey: profileIconKey,
            googleAccountId: googleUserId,
          })
          .then(() => undefined),
      );
    }

    await c.env.KV.put(sessionId, userId, {
      expirationTtl: token.expires_in,
    });

    return c.redirect('/', 302);
  },
);
