import { clearSession, clearSessionCookie, getSessionCookie } from '@/features/user';
import { authorize } from '@/middleware';
import { createRoute } from 'honox/factory';

export const POST = createRoute(authorize, async (c) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const sessionId = await getSessionCookie(c).then((v) => v!);

  clearSessionCookie(c);
  c.executionCtx.waitUntil(clearSession(c.env.KV, sessionId));
  c.set('user', undefined);

  return c.render(
    <>
      <p>サインアウトしました</p>
      <a href="/">
        <button type="button">トップへ戻る</button>
      </a>
    </>,
    { title: 'サインアウトしました' },
  );
});
