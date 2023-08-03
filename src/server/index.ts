import "reflect-metadata";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cookieParser from "cookie-parser";
import { appRouter } from "./router";
import { createContext } from "./router/context";
import appConfig from "./config/app.config";
import { AppDataSource } from "./database/dataSource";
import morgan from "morgan";

const app = express();
const MOUNT_PATH = appConfig.getServerMountPath();

/** Middleware */
app.use(cookieParser());
app.use(morgan("dev"));

/** Main Router */
app.use(
  MOUNT_PATH,
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

/** Fire server up */
const PORT = appConfig.getDevPort();
AppDataSource.initialize()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    }),
  )
  .catch(() => {
    console.warn(
      "Connection with the database could not be established. The server did not start.",
    );
  });
