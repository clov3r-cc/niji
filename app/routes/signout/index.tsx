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
  c.env.SESSION.delete(sessionId);

  return c.text('Singed out!', 200);
});

export default createRoute((c) =>
  c.render(
    <form action="/signout" method="POST">
      <input type="submit" value="送信" />
    </form>,
    { title: 'サインアウトする' },
  ),
);
