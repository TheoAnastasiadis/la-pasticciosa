/* istanbul ignore file */

import type { NextFunction, Response, Request } from "express";
import logger from "firebase-functions/logger";
import appConfig from "../../../config/app.config";

const log: (
  err: Error | undefined,
  req: Request,
  res: Response,
  next: NextFunction,
) => void = (err, req, res, next) => {
  if (typeof err !== "undefined") {
    logger.info("path", req.url);
    logger.log("database", appConfig.getDBUsed());
    if (typeof req.user !== "undefined")
      logger.log("user", JSON.stringify(req.user));
    logger.error(err);
  }
};

export default log;
