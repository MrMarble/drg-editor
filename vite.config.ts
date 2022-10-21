import react from "@vitejs/plugin-react";
import critical from "rollup-plugin-critical";
import { defineConfig, UserConfig } from "vite";
import { imagetools } from "vite-imagetools";
// https://vitejs.dev/config/

// fix types
const criticalCSS = (critical as unknown as { default: unknown })
  .default as typeof critical;

export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [
      react(),
      imagetools(),
      {
        ...criticalCSS({
          criticalUrl: "http://localhost:5173",
          criticalBase: "dist",
          criticalPages: [
            { uri: mode === "vercel" ? "/" : "/drg-editor", template: "index" },
          ],
          criticalConfig: {
            inline: true,
            src: "dist/index.html",
            base: "dist",
          },
        }),
        enforce: "post",
        apply: "build",
      },
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
