import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { babel } from "@rollup/plugin-babel";

import { config } from "dotenv";
config({ debug: true, path: ".env.local" });

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
      "/data": {
        target: process.env.EMULATORS_URL as string,
        rewrite: (path) => path.replace("/data", "/data/data"),
      },
      "/auth": {
        target: process.env.EMULATORS_URL as string,
        rewrite: (path) => path.replace("/auth", "/auth/auth"),
      },
    },
  },
});
