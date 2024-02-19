import type { User } from '@/features/user';
import {} from 'hono';

type AppVariables = {
  user?: User;
};

type AppBindings = {
  D1: D1Database;
  KV: KVNamespace;
  R2: R2Bucket;
};

type EnvVariables = {
  GOOGLE_ID: string;
  GOOGLE_SECRET: string;
  SESSION_COOKIE_SECRET: string;
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
