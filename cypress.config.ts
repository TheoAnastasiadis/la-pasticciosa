import { defineConfig } from "cypress";
import { setup, teardown } from "./cypress/seed";
import { AppDataSource } from "./src/server/database";
import appConfig from "./src/server/config/app.config";

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    defaultCommandTimeout: 10000,
    baseUrl: appConfig.getStagingUrl(),
    setupNodeEvents(on, config) {
      on("task", {
        async setup() {
          await AppDataSource.initialize();
          try {
            await setup();
          } finally {
            await AppDataSource.destroy();
            return null;
          }
        },
        async teardown() {
          await AppDataSource.initialize();
          try {
            await teardown();
          } finally {
            await AppDataSource.destroy();
          }
          return null;
        },
      });
    },
  },
});
