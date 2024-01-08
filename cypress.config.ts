import { defineConfig } from "cypress";
import { setup, teardown } from "./cypress/seed";
import { AppDataSource } from "./src/server/database";

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    defaultCommandTimeout: 6000,
    baseUrl: "http://localhost:5173/",
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
