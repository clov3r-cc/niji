import type { Config } from 'drizzle-kit';

/**
 * drizzle-kitでローカルのminiflareが生成するD1(SQLite)のマイグレーションを行うための設定。
 */
const localConfig = {
  schema: 'app/dbSchema.ts',
  out: 'migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    // SQLiteのファイル名は環境によって異なるので、実際に生成されたものに書き換えてください。
    url: '.mf/d1/miniflare-D1DatabaseObject/e7352547963de7050bd7d94658afc4fe78b61811b7815da12d90be8e863abf4d.sqlite',
  },
} satisfies Config;

export default localConfig;
