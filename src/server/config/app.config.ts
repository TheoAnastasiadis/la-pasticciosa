import { config } from "dotenv";
config({ debug: process.env.NODE_ENV === "production" });

export default {
  getDBUrl: () =>
    (process.env.NODE_ENV === "production"
      ? process.env.PRODUCTION_DATABASE_URL
      : process.env.DEVELOPMENT_DATABASE_URL) as string,
  getDevPort: () => parseInt(process.env.DEV_PORT ?? "8080"),
  getServerMountPath: () => process.env.SERVER_MOUNT_PATH ?? "/data",
  getSaltRounds: () => parseInt(process.env.SALT_ROUNDS as string),
  getClientUrl: () =>
    (process.env.NODE_ENV === "production"
      ? process.env.clientUrl
      : "http://localhost:5173") as string,
  getPaginationLimit: () => 20,
  getOpenAIKey: () => process.env.OPENAI_API_KEY,
};
