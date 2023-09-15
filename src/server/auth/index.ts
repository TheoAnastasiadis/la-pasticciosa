import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import log from "./middleware/log";
import reporter from "./middleware/report";

import router from "./router";

const app = express();

/** Middleware */
app.use(reporter.requestReporter);
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(reporter.errorReporter);
app.use(log);

/** Mount router */
app.use("/auth", router);

export default app;
