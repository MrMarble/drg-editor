import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    plugins: [react(), ViteWebfontDownload(), imagetools()],
  };

  if (mode === 'vercel') {
    return config;
  }
  return {
    ...config,
    base: '/drg-editor/',
  };
});
