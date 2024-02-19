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
    url: '.mf/d1/miniflare-D1DatabaseObject/43f24c89f0e12f933cdd01f76db89f68337b8866236eeb99eb051c0ffd4bbc25.sqlite',
  },
} satisfies Config;

export default localConfig;
