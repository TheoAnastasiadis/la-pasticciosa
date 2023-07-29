import type { user } from "../../entities/decoders/user.decoder";
import { viewUsers } from "../../useCases/users/viewUsers";
import type { z } from "zod";
import { throwDBError } from "../errors/db.error";

export const viewUsersController: () => Promise<
  Array<z.infer<typeof user>>
> = async () =>
  (await viewUsers().catch(throwDBError)).map((user) => user.toSafeOutput());
