import pages from '@hono/vite-build/cloudflare-pages';
import devServer from '@hono/vite-dev-server';
import { defineConfig } from 'vite';

export default defineConfig(async ({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: 'src/web/index.tsx',
          output: {
            entryFileNames: 'static/web/index.js',
          },
        },
      },
    };
  }

  return {
    ssr: {
      external: ['react', 'react-dom'],
    },
    plugins: [
      pages(),
      devServer({
        entry: 'src/index.tsx',
      }),
    ],
  };
});
