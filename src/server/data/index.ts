import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import { appRouter as router } from "./router";
import { createContext } from "./router/setup/context";
import * as trpcExpress from "@trpc/server/adapters/express";
import onError from "./router/setup/onError";
import * as Sentry from "@sentry/node";

const app = express();

/** Middleware */
app.use(cookieParser());
app.use(morgan("dev"));
app.use(Sentry.Handlers.requestHandler());

/** Router */
app.use(
  "/data",
  trpcExpress.createExpressMiddleware({
    router,
    createContext,
    onError,
  }),
);

export default app;
