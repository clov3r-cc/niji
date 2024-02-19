import { getCookie, setCookie } from 'hono/cookie';
import { createRoute } from 'honox/factory';
import { authorize } from '../../middleware';

export const POST = createRoute(authorize, (c) => {
  // biome-ignore lint/style/noNonNullAssertion: the id has already verified by middleware
  const sessionId = getCookie(c, '__session')!;

  setCookie(c, '__session', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: -60,
    path: '/',
  });
  c.executionCtx.waitUntil(c.env.KV.delete(sessionId));
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
