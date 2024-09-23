import pages from '@hono/vite-build/cloudflare-pages';
import devServer from '@hono/vite-dev-server';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
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
      plugins: [typescriptPaths()],
    };
  }

  return {
    ssr: {
      external: ['react', 'react-dom'],
    },
    plugins: [
      // Prevents this plugin replace the extension from '.ts(x)' to '.js' and the replacement occur an error which says: Could not load someFile.js
      typescriptPaths({ preserveExtensions: true }),
      pages(),
      devServer({
        entry: 'src/index.tsx',
      }),
    ],
  };
});
