import type { OnErrorFunction } from "@trpc/server/dist/internals/types";
import appConfig from "../../../config/app.config";
import * as Sentry from "@sentry/node";
import logger from "firebase-functions/logger";

Sentry.init({
  dsn: appConfig.getSentryDsn(),
  debug: false,
});

export default function onError(
  opts: Parameters<OnErrorFunction<any, any>>[0],
): void {
  const { error, type, path, input, ctx, req } = opts;

  // log error
  logger.info("path", path);
  logger.log("database", appConfig.getDBUsed());
  logger.log("session", { id: ctx.sessionId });
  logger.log(
    "user",
    JSON.stringify(
      {
        email: ctx?.session?.user?.email,
        id: ctx?.session?.user?.uuid,
        username: ctx?.session?.user?.userName,
      },
      null,
      2,
    ),
  );
  logger.log("input", JSON.stringify(input, null, 2));
  logger.error(error, type);

  // report error
  Sentry.setContext("path", { path });
  Sentry.setContext("db", { type: appConfig.getDBUsed() });
  Sentry.setContext("session", { id: ctx.sessionId });
  Sentry.setContext("request", req);
  Sentry.setUser({
    id: ctx?.session?.user?.uuid,
    email: ctx?.session?.user?.email,
    username: ctx?.session?.user?.username,
  });
  Sentry.captureException(error, {
    contexts: {
      trace: {
        data: {
          stack: error.stack,
          cause: error.cause,
          code: error.code,
          type,
        },
        span_id: "",
        trace_id: "",
      },
    },
  });

  // delete stack in production
  if (process.env.NODE_ENV !== "development") delete error.stack;
}
