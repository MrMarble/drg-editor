import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { ViteWebfontDownload } from "vite-plugin-webfont-dl";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "vercel") {
    return {
      plugins: [
        react(),
        ViteWebfontDownload(),
        checker({
          typescript: true,
          eslint: {
            lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
          },
        }),
      ],
    };
  }
  return {
    plugins: [react(), ViteWebfontDownload()],
    base: "/drg-editor/",
  };
});
