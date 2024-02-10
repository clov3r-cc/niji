import { css } from 'hono/css';
import { createRoute } from 'honox/factory';
import { Counter } from '../islands';
import { authorize } from '../middleware';

const className = css`
  font-family: sans-serif;
`;

export default createRoute(authorize, (c) => {
  const userId = c.get('userId');

  return c.render(
    <div class={className}>
      <h1>Hello, {userId}!</h1>
      <Counter />
    </div>,
    { title: userId },
  );
});
