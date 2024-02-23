import { addUser, findUserByGoogleAccountId, saveSession, setSessionCookie } from '@/features/user';
import { uuidv4 } from '@/lib';
import { googleAuth } from '@hono/oauth-providers/google';
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
    const googleAccountId = googleUser?.id;
    const googleUserName = googleUser?.name;

    if (!(token && googleUser && googleAccountId && googleUserName)) {
      return c.text('Failed to get the user info', 500);
    }

    const sessionId = await setSessionCookie(c, token.expires_in);

    const user = await findUserByGoogleAccountId(c.env.D1, googleAccountId);
    const isNewUser = !user;
    const userId = isNewUser ? uuidv4() : user.userId;
    if (isNewUser) {
      const profileIconKey = await storeProfileIcon(c.env.R2, userId, googleUser.picture);

      c.executionCtx.waitUntil(
        addUser(c.env.D1, { userId, name: googleUserName, googleAccountId, profileIconKey }).then(() => undefined),
      );
    }

    c.executionCtx.waitUntil(saveSession(c.env.KV, sessionId, userId, token.expires_in));

    return c.redirect('/', 302);
  },
);
