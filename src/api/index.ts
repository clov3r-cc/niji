import { healthCheckEndpoint, usersEndpoint } from './endpoints';
import { createAppWithDb } from './libs/factory';

const app = createAppWithDb();

const routes = app
  .route('/health', healthCheckEndpoint)
  .route('/users', usersEndpoint);

export type AppRoutes = typeof routes;

export default app;
