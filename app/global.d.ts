import {} from 'hono';

type Head = {
  title?: string;
};

type AppBindings = {
  DB: D1Database;
  KV: KVNamespace;
};

type EnvVariables = {
  GOOGLE_ID: string;
  GOOGLE_SECRET: string;
};

declare module 'hono' {
  interface Env {
    Variables: { userId: string };
    Bindings: AppBindings & Partial<EnvVariables>;
  }
  interface ContextRenderer {
    // biome-ignore lint/nursery/useShorthandFunctionType: for internal usage
    (content: string | Promise<string>, head?: Head): Response | Promise<Response>;
  }
}
