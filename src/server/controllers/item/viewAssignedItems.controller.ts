import type { Item } from "../../entities/item.entity";
import type { User } from "../../entities/user.entity";
import { viewAssignedItems } from "../../useCases/items/viewAssignedItems";
import { assertExists } from "../helpers/assertExists";
import { fetchUser } from "../helpers/fetchUser";
import { throwDBError } from "../helpers/throwDBError";

export const viewAssignedItemsController: (
  uuid: string,
) => Promise<Item[] | undefined> = async (uuid) => {
  const user = fetchUser(uuid);
  assertExists<User>(user);
  return await viewAssignedItems(user).catch(throwDBError);
};
