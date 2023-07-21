import { User } from "../../entities/user.entity";
import { AppDataSource } from "../dataSource";

export const userRepo = AppDataSource.getRepository(User);
