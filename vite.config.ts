/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import type { UserConfigExport } from 'vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env.BASE_PATH = '/';

  const base: UserConfigExport = {
    plugins: [
      tsconfigPaths(),
      react(),
      ...(mode === 'test' ? [] : [eslintPlugin()])
    ],
    optimizeDeps: {
      disabled: false
    },
    test: {
      css: false,
      include: ['./src/**/__tests__/*'],
      globals: true,
      clearMocks: true,
      coverage: {
        provider: 'istanbul',
        enabled: true,
        reporter: ['text', 'lcov'],
        reportsDirectory: 'coverage'
      },
      environment: 'jsdom',
      setupFiles: './src/__tests__/setup.ts'
    },
    build: {
      commonjsOptions: {
        include: []
      },
      sourcemap: false,
      minify: true,
      emptyOutDir: true,
      outDir: 'dist',
      rollupOptions: {
        treeshake: true,
        output: {
          chunkFileNames: 'bundle/[name].[hash].js',
          // eslint-disable-next-line consistent-return
          manualChunks: id => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    }
  };

  // Github publish content based on the repo name.
  // For vercel, we need to keep the base path as /.
  if (mode !== 'vercel') {
    process.env.BASE_PATH = '/drg-editor/';
    return {
      ...base,
      base: process.env.BASE_PATH
    };
  }

  return base;
});
