import pages from '@hono/vite-cloudflare-pages';
import adapter from '@hono/vite-dev-server/cloudflare';
import devServer from '@hono/vite-dev-server';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

const outputDir = 'dist';

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        outDir: outputDir,
        rollupOptions: {
          input: 'src/web/index.tsx',
          output: {
            entryFileNames: 'static/client.js',
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
      tsconfigPaths(),
      pages({ outputDir }),
      devServer({
        adapter,
        entry: 'src/index.tsx',
      }),
    ],
  };
});
