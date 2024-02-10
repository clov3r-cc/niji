type AppBindings = {
  DB: D1Database;
  SESSION: KVNamespace;
};

type EnvVariables = {
  GOOGLE_ID: string;
  GOOGLE_SECRET: string;
};

export type Env = {
  Bindings: AppBindings & Partial<EnvVariables>;
  Variables: { userId: string };
};
