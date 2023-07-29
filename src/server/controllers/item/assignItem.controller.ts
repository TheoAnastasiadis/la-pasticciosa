import type { user } from "../../entities/decoders/user.decoder";
import { Item } from "../../entities/item.entity";
import { User } from "../../entities/user.entity";
import { assignItem } from "../../useCases/items/assignItem";
import { throwNotFoundError } from "../errors/notFound.error";
import { throwDBError } from "../errors/db.error";
import type { z } from "zod";

export const assignItemController: (
  itemId: string,
  userUuid: string,
) => Promise<z.infer<typeof user>> = async (itemId, userUuid) => {
  const user = await User.findById(userUuid).catch(throwDBError);
  const item = await Item.findById(itemId).catch(throwNotFoundError);
  return (await assignItem(item, user).catch(throwDBError)).toSafeOutput();
};
