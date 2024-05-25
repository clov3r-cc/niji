import { Hono } from 'hono';

const app = new Hono();

export const healthCheckEndpoint = app.get('/', (c) =>
  c.json({ message: 'Hi, API is alive!' }),
);
