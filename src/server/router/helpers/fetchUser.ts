import { userRepo } from "../../database/repos/user.repo";
import type { User } from "../../entities/user.entity";
import { throwDBError } from "./throwDBError";

export const fetchUser: (uuid: string) => Promise<User | null> = async (uuid) =>
  await userRepo.findOneBy({ uuid }).catch(throwDBError);
