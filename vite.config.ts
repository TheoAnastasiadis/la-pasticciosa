import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { babel } from "@rollup/plugin-babel";

import { config } from "dotenv";
config();

// https://vitejs.dev/config/
export default defineConfig({
  root: "src/client",
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
  server: {
    proxy: {
      "/data": process.env.DEV_DATA_URL as string,
      "/auth": process.env.DEV_AUTH_URL as string,
    },
  },
});
