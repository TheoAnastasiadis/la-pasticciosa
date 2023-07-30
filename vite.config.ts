import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { inkline } from "@inkline/plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src/client",
  plugins: [inkline(), (vue as any)()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src/client/src", import.meta.url)),
    },
  },
});
