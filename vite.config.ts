import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { inkline } from "@inkline/plugin/vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src/client",
  plugins: [
    inkline({
      outputDir: resolve(__dirname, "./src/client/src/css/variables"),
    }),
    (vue as any)(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src/client/src", import.meta.url)),
    },
  },
});
