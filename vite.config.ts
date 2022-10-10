import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ViteWebfontDownload } from "vite-plugin-webfont-dl";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "vercel") {
    return {
      plugins: [react(), ViteWebfontDownload()],
    };
  }
  return {
    plugins: [react(), ViteWebfontDownload()],
    base: "/drg-editor/",
  };
});
