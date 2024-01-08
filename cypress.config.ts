import { defineConfig } from "cypress";
import { setup, teardown } from "./cypress/seed";
import { AppDataSource } from "./src/server/database";

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    defaultCommandTimeout: 5000,
    setupNodeEvents(on, config) {
      on("task", {
        async setup() {
          await AppDataSource.initialize();
          await setup();
          await AppDataSource.destroy();
          return null;
        },
        async teardown() {
          await AppDataSource.initialize();
          await teardown();
          await AppDataSource.destroy();
          return null;
        },
      });
    },
  },
});
