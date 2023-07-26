import { Session } from "../../entities/session.entity";
import { AppDataSource } from "../dataSource";

export const sessionRepo = AppDataSource.getRepository(Session);
