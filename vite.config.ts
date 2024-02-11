import pages from '@hono/vite-cloudflare-pages';
import { getEnv } from '@hono/vite-dev-server/cloudflare-pages';
import honox from 'honox/vite';
import client from 'honox/vite/client';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [tsconfigPaths(), client()],
    };
  }

  return {
    plugins: [
      tsconfigPaths(),
      honox({
        devServer: {
          env: getEnv({
            bindings: {
              GOOGLE_ID: process.env.GOOGLE_ID || '',
              GOOGLE_SECRET: process.env.GOOGLE_SECRET || '',
            },
            compatibilityDate: '2023-12-31',
            kvNamespaces: ['KV'],
            kvPersist: true,
            d1Databases: ['DB'],
            d1Persist: true,
          }),
        },
      }),
      pages(),
    ],
  };
});
