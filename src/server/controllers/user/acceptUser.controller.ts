import type { User } from "../../entities/user.entity";
import { acceptUser } from "../../useCases/users/acceptUser";
import { assertExists } from "../helpers/assertExists";
import { fetchUser } from "../helpers/fetchUser";
import { throwDBError } from "../helpers/throwDBError";

export const acceptUserController: (uuid: string) => Promise<User> = async (
  uuid,
) => {
  const user = await fetchUser(uuid);
  assertExists<User>(user);
  return await acceptUser(user).catch(throwDBError);
};
