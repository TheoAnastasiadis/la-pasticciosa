import "reflect-metadata";
import { AppDataSource } from "./database";
import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";

import dataApp from "./data";

/** Init */
await AppDataSource.initialize();
initializeApp();

/** Mount */
export const data = onRequest(dataApp);
