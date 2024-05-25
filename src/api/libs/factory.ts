import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import type { Variables } from 'hono/types';

type Merge<
  F extends Record<string, unknown>,
  S extends Record<string, unknown>,
> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K] // 後ろ側であるSを先に書く
    : K extends keyof F
      ? F[K]
      : never;
};

type Env<T extends Variables> = {
  Bindings: {
    DB: D1Database;
  };
  Variables: Merge<
    T,
    {
      db: DrizzleD1Database;
    }
  >;
};

export const createAppWithDb = <T extends Variables>() => {
  const app = new Hono<Env<T>>();
  app.use('*', async (c, next) => {
    c.set('db', drizzle(c.env.DB));
    await next();
  });

  return app;
};
