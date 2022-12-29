import { defineConfig } from "cypress";

export default defineConfig({
  fileServerFolder: "dist",
  fixturesFolder: "cypress/fixtures",
  projectId: "drg-editor",
  e2e: {
    baseUrl: "http://localhost:4173/drg-editor/",
    specPattern: "cypress/e2e/**/*.ts",
  },
});
