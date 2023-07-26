import type { Delivery } from "../../entities/delivery.entity";
import type { User } from "../../entities/user.entity";
import { viewUserProfile } from "../../useCases/users/viewUserProfile";
import { assertExists } from "../helpers/assertExists";
import { fetchUser } from "../helpers/fetchUser";
import { assertUserIsAsminOrOwner } from "../helpers/userIsAdminOrOwner";

export const viewUserProfileController: (
  uuid: string,
  user: User,
) => Promise<{ user: User; deliveries: Delivery[] }> = async (uuid, user) => {
  assertUserIsAsminOrOwner(user, uuid);
  const userToBeViewd = await fetchUser(uuid);
  assertExists<User>(userToBeViewd);
  return await viewUserProfile(userToBeViewd);
};
