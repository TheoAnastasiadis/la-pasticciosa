import { userRepo } from "../../database/repos/user.repo";
import type { User } from "../../entities/user.entity";
import { assertExists } from "../helpers/assertExists";
import { throwDBError } from "../helpers/throwDBError";

export const viewUserController: (uuid: string) => Promise<User> = async (
  uuid,
) => {
  const user = await userRepo.findOneBy({ uuid }).catch(throwDBError);
  assertExists<User>(user);
  return user;
};
