// import express from "express";
// import cookieParser from "cookie-parser";
// import morgan from "morgan";
// import router from "./router";
// import { sessionAuth, sentry } from "./middleware";

// const app = express();

// /** Middleware */
// app.use(cookieParser());
// app.use(morgan("dev"));
// app.use(sentry.Handlers.requestHandler());

// /** Router */
// // eslint-disable-next-line @typescript-eslint/no-misused-promises
// app.use("/conversation", sessionAuth, router);

// /** Error Handling */
// app.use(sentry.Handlers.errorHandler());

// export default app;
