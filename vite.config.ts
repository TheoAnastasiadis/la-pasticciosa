import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { babel } from "@rollup/plugin-babel";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src/client",
  plugins: [
    (vue as any)(),
    babel({
      exclude: /node_modules/,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src/client/src", import.meta.url)),
    },
  },
});
