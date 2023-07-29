import type { user } from "../../entities/decoders/user.decoder";
import { User } from "../../entities/user.entity";
import { acceptUser } from "../../useCases/users/acceptUser";
import { throwNotFoundError } from "../errors/notFound.error";
import { throwDBError } from "../errors/db.error";
import type { z } from "zod";

export const acceptUserController: (
  uuid: string,
) => Promise<z.infer<typeof user>> = async (uuid) => {
  const user = await User.findById(uuid).catch(throwNotFoundError);
  return (await acceptUser(user).catch(throwDBError)).toSafeOutput();
};
