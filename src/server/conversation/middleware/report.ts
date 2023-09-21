import * as Sentry from "@sentry/node";
import appConfig from "../../config/app.config";

Sentry.init({ dsn: appConfig.getSentryDsn() });

export const sentry = Sentry;
