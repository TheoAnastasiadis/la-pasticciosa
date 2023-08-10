import type { user } from "../../entities/decoders/user.decoder";
import type { z } from "zod";
import { User } from "../../entities/user.entity";
import { throwDBError } from "../errors/db.error";
import { rejectUser } from "../../useCases/users/rejectUser";

export const rejectUserController: (
  uuid: string,
) => Promise<z.infer<typeof user>> = async (uuid) => {
  const pendingUser = await User.findOneByOrFail({ uuid }).catch(throwDBError);
  const rejectedUser = await rejectUser(pendingUser);
  return rejectedUser.toSafeOutput();
};
