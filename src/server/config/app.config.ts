import { config } from "dotenv";
config({ debug: process.env["NODE_ENV"] === "production" });

export default {
  getDBUrl: () =>
    (process.env["NODE_ENV"] === "production"
      ? process.env["PRODUCTION_DATABASE_URL"]
      : process.env["DEVELOPMENT_DATABASE_URL"]) as string,
};
