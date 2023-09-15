import * as Sentry from "@sentry/node";
import appConfig from "../../../config/app.config";

Sentry.init({
  dsn: appConfig.getSentryDsn(),
  debug: false,
});

export default {
  requestReporter: Sentry.Handlers.requestHandler(),
  errorReporter: Sentry.Handlers.errorHandler(),
};
