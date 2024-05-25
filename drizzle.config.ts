import type { Config } from 'drizzle-kit';

export default {
  schema: 'src/api/infra/dbSchema.ts',
  out: './migrations',
  dialect: 'sqlite',
} satisfies Config;
