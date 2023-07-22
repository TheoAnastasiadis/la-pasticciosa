import type { Delivery } from "../../entities/delivery.entity";
import type { User } from "../../entities/user.entity";
import { viewUserProfile } from "../../useCases/users/viewUserProfile";
import { assertExists } from "../helpers/assertExists";
import { fetchUser } from "../helpers/fetchUser";

export const viewUserProfileController: (
  uuid: string,
) => Promise<{ user: User; deliveries: Delivery[] }> = async (uuid) => {
  const user = await fetchUser(uuid);
  assertExists<User>(user);
  return await viewUserProfile(user);
};
