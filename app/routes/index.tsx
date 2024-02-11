import Counter from '@/islands/counter';
import { authorize } from '@/middleware';
import { css } from 'hono/css';
import { createRoute } from 'honox/factory';

const className = css`
  font-family: sans-serif;
`;

export default createRoute(authorize, (c) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const user = c.get('user')!;

  return c.render(
    <div class={className}>
      <h1>Hello, {user.name}!</h1>
      <Counter />
      <form action="/signout" method="POST">
        <input type="submit" value="サインアウトする" />
      </form>
    </div>,
    { title: user.name },
  );
});
