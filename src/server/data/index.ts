import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import { appRouter } from "./router";
import { createContext } from "./router/setup/context";
import * as trpcExpress from "@trpc/server/adapters/express";

const app = express();

/** Middleware */
app.use(cookieParser());
app.use(morgan("dev"));

/** Router */
app.use(
  "/data",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

export default app;
