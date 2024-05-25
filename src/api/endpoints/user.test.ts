import { usersEndpoint } from './users';
import { env } from 'cloudflare:test';

it('', async () => {
  await usersEndpoint.request('/user-id', {}, env);
});
