import { User } from "../../entities/user.entity";
import { viewUserProfile } from "../../useCases/users/viewUserProfile";
import { throwNotFoundError } from "../errors/notFound.error";
import { assertUserIsAdminOrAcceptedOwner } from "../helpers/userIsAdminOrOwner";
import type { z } from "zod";
import type { user as userDecoder } from "../../entities/decoders/user.decoder";
import type { delivery } from "../../entities/decoders/delivery.decoder";
import { throwDBError } from "../errors/db.error";

export const viewUserProfileController: (
  uuid: string,
  caller: User,
) => Promise<{
  user: z.infer<typeof userDecoder>;
  deliveries: Array<z.infer<typeof delivery>>;
}> = async (uuid, caller) => {
  assertUserIsAdminOrAcceptedOwner(caller, uuid);
  const user = await User.findById(uuid).catch(throwNotFoundError);
  const { deliveries } = await viewUserProfile(user).catch(throwDBError);
  return {
    user: user.toSafeOutput(),
    deliveries: deliveries.map((delivery) => delivery.toSafeOutput()),
  };
};
