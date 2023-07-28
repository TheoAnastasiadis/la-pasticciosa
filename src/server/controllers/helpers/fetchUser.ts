import { userRepo } from "../../database/repos/user.repo";
import type { User } from "../../entities/user.entity";
import { throwDBError } from "./throwDBError";

export const fetchUser: (uuid: string) => Promise<User> = async (uuid) =>
  await userRepo.findOneByOrFail({ uuid }).catch(throwDBError);
