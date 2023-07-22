import type { Item } from "../../entities/item.entity";
import type { User } from "../../entities/user.entity";
import { assignItem } from "../../useCases/items/assignItem";
import { assertExists } from "../helpers/assertExists";
import { fetchItem } from "../helpers/fetchItem";
import { fetchUser } from "../helpers/fetchUser";
import { throwDBError } from "../helpers/throwDBError";

export const assignItemController: (
  itemId: string,
  userUuid: string,
) => Promise<User> = async (itemId, userUuid) => {
  const user = await fetchUser(userUuid);
  assertExists<User>(user);

  const item = await fetchItem(itemId);
  assertExists<Item>(item);

  return await assignItem(item, user).catch(throwDBError);
};
