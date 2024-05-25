import { healthCheckEndpoint } from './health';

it('healthCheckEndpoint should return 200 response', async () => {
  const actual = await healthCheckEndpoint.request('/');

  expect(actual.status).toBe(200);
  expect(await actual.json()).toStrictEqual({ message: 'Hi, API is alive!' });
});
