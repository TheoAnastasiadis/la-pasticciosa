/* istanbul ignore file */
import "reflect-metadata";
import { AppDataSource } from "./database/index";
import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";

import dataApp from "./data/index";
import authApp from "./auth/index";

/** Init */
await AppDataSource.initialize().catch(console.error);
initializeApp();

/** Mount */
export const data = onRequest(dataApp);
export const auth = onRequest(authApp);
