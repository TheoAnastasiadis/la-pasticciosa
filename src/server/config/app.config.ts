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
  getFacebookAppId: () => process.env.FACEBOOK_APP_ID as string,
  getFacebookAppSecret: () => process.env.FACEBOOK_APP_SECRET as string,
  getViberAuthToken: () => process.env.VIBER_BOT_SECRET as string,
  getEmailServer: () => process.env.SMTP_SERVER as string,
  getSenderEmailAddress: () => process.env.SENDER_EMAIL_ADDRESS as string,
  getReplyEmailAddress: () => process.env.REPLY_EMAIL_ADDRESS as string,
  getEmailPassword: () => process.env.EMAIL_PASSWORD as string,
};
