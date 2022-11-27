import react from "@vitejs/plugin-react";
import { defineConfig, UserConfigExport } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env.BASE_PATH = "/";

  const base: UserConfigExport = {
    plugins: [tsconfigPaths(), react()],
    build: {
      sourcemap: false,
      minify: true,
      emptyOutDir: true,
      outDir: "dist",
      rollupOptions: {
        treeshake: true,
        output: {
          chunkFileNames: "bundle/[name].[hash].js",
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
  };

  // Github publish content based on the repo name.
  // For vercel, we need to keep the base path as /.
  if (mode !== "vercel") {
    process.env.BASE_PATH = "/drg-editor/";
    return {
      ...base,
      base: process.env.BASE_PATH,
    };
  }
});
