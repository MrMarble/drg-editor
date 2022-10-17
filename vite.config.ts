import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import Compression from "vite-compression-plugin";
import checker from "vite-plugin-checker";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import { ViteWebfontDownload } from "vite-plugin-webfont-dl";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    plugins: [
      react(),
      ViteWebfontDownload(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        },
      }),
      Compression({
        loginfo: "silent",
      }),
      chunkSplitPlugin({
        strategy: "single-vendor",
      }),
    ],
  };

  if (mode === "vercel") {
    return config;
  }

  return {
    ...config,
    base: "/drg-editor/",
  };
});
