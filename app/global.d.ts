import {} from 'hono';
import type { usersTable } from './dbSchema';

type AppVariables = {
  user?: typeof usersTable.$inferSelect;
};

type AppBindings = {
  DB: D1Database;
  KV: KVNamespace;
  R2: R2Bucket;
};

type EnvVariables = {
  GOOGLE_ID: string;
  GOOGLE_SECRET: string;
};

type Head = {
  title?: string;
};

declare module 'hono' {
  interface Env {
    Variables: AppVariables;
    Bindings: AppBindings & Partial<EnvVariables>;
  }
  interface ContextRenderer {
    // biome-ignore lint/nursery/useShorthandFunctionType: for internal usage
    (content: string | Promise<string>, head?: Head): Response | Promise<Response>;
  }
}
