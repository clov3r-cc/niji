import Counter from '@/islands/counter';
import { authorize } from '@/middleware';
import { css } from 'hono/css';
import { createRoute } from 'honox/factory';

const className = css`
  font-family: sans-serif;
`;

export default createRoute(authorize, async (c) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const user = c.get('user')!;
  const object = await c.env.R2.get(user.profileIconKey ?? '');
  const base64 = await object
    ?.arrayBuffer()
    .then(Buffer.from)
    .then((b) => b.toString('base64'));
  const contentType = object?.httpMetadata?.contentType ?? '';

  return c.render(
    <div class={className}>
      <h1>Hello, {user.name}!</h1>
      {base64 ? <img src={`data:${contentType};base64,${base64}`} alt="profile icon" /> : undefined}
      <Counter />
      <form action="/signout" method="POST">
        <input type="submit" value="サインアウトする" />
      </form>
    </div>,
    { title: user.name },
  );
});
