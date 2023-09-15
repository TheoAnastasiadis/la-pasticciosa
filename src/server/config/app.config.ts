import { config } from "dotenv";
config({ debug: process.env.NODE_ENV !== "production" });

export default {
  getDBUrl: () => process.env.DATABASE_URL as string,
  getDBUsed: () => new URL(process.env.DATABASE_URL as string).pathname,
  getSaltRounds: () => parseInt(process.env.SALT_ROUNDS as string),
  getClientUrl: () => process.env.CLIENT_URL as string,
  getPaginationLimit: () => 20,
  getGoogleClientId: () => process.env.GOOGLE_CLIENT_ID as string,
  getGoogleClientSecret: () => process.env.GOOGLE_CLIENT_SECRET as string,
  getSentryDsn: () => process.env.SENTRY_DSN as string,
};
