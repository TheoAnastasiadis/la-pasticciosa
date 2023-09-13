import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";

import router from "./router";

const app = express();

/** Middleware */
app.use(morgan("tiny"));
app.use(bodyParser.json());

/** Mount router */
app.use("/auth", router);

export default app;
