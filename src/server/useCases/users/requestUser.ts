import { userRepo } from "../../database/repos/user.repo";
import type { User } from "../../entities/user.entity";

export const requestUser: (user: Omit<User, "uuid">) => Promise<User> = async (
  user,
) => {
  const uuid = (await userRepo.insert(user)).generatedMaps[0].id;
  return { ...user, uuid };
};
