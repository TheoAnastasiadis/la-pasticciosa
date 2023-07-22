import type { InsertResult } from "typeorm";
import { userRepo } from "../../database/repos/user.repo";
import type { User } from "../../entities/user.entity";

export const createUser: (user: User) => Promise<InsertResult> = async (user) =>
  await userRepo.insert(user);
