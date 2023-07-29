import type { z } from "zod";
import type { item } from "../../entities/decoders/item.decoder";
import type { User } from "../../entities/user.entity";
import { viewAssignedItems } from "../../useCases/items/viewAssignedItems";
import { throwDBError } from "../errors/db.error";
import { assertUserIsAdminOrAcceptedOwner } from "../helpers/userIsAdminOrOwner";

export const viewAssignedItemsController: (
  user: User,
  uuid: string,
) => Promise<Array<z.infer<typeof item>>> = async (user, uuid) => {
  assertUserIsAdminOrAcceptedOwner(user, uuid);
  return (await viewAssignedItems(uuid).catch(throwDBError)).map((item) =>
    item.toSafeOutput(),
  );
};
