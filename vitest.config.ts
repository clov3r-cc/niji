import path from 'node:path';
import {
  defineWorkersConfig,
  readD1Migrations,
} from '@cloudflare/vitest-pool-workers/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineWorkersConfig(async () => {
  const migrationsPath = path.join(__dirname, 'migrations');
  const migrations = await readD1Migrations(migrationsPath);

  return {
    plugins: [tsconfigPaths()],
    test: {
      globals: true,
      setupFiles: ['tests/setupD1.ts'],
      poolOptions: {
        workers: {
          singleWorker: true,
          wrangler: {
            configPath: 'wrangler.toml',
          },
          miniflare: {
            bindings: {
              TEST_MIGRATIONS: migrations,
            },
          },
        },
      },
      coverage: {
        provider: 'istanbul',
      },
    },
  };
});
