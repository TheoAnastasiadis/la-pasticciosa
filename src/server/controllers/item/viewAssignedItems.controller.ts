import type { Item } from "../../entities/item.entity";
import type { User } from "../../entities/user.entity";
import { viewAssignedItems } from "../../useCases/items/viewAssignedItems";
import { throwDBError } from "../helpers/throwDBError";
import { assertUserIsAsminOrOwner } from "../helpers/userIsAdminOrOwner";

export const viewAssignedItemsController: (
  user: User,
  uuid: string,
) => Promise<Item[] | undefined> = async (user, uuid) => {
  assertUserIsAsminOrOwner(user, uuid);
  return await viewAssignedItems(uuid).catch(throwDBError);
};
