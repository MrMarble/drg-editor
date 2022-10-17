import react from "@vitejs/plugin-react";
import { defineConfig, UserConfig } from "vite";
import { ViteAliases } from "vite-aliases";
import Compression from "vite-compression-plugin";
import checker from "vite-plugin-checker";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import { ViteWebfontDownload } from "vite-plugin-webfont-dl";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    esbuild: {
      treeShaking: true,
      drop: ["console", "debugger"],
    },
    plugins: [
      react(),
      ViteWebfontDownload(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        },
      }),
      ViteAliases({ useTypescript: true, useConfig: true }),
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
