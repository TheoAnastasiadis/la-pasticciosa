import { config } from "dotenv";
config({ debug: process.env.NODE_ENV === "production" });

export default {
  getDBUrl: () => process.env.DATABASE_URL as string,
  getSaltRounds: () => parseInt(process.env.SALT_ROUNDS as string),
  getClientUrl: () => process.env.CLIENT_URL as string,
  getPaginationLimit: () => 20,
};
