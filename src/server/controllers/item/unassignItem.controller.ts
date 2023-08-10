import { User } from "../../entities/user.entity";
import type { z } from "zod";
import type { user } from "../../entities/decoders/user.decoder";
import { Item } from "../../entities/item.entity";
import { throwNotFoundError } from "../errors/notFound.error";
import { throwDBError } from "../errors/db.error";

export const unassignItemController: (
  userId: string,
  itemId: string,
) => Promise<z.infer<typeof user>> = async (userId, itemId) => {
  const item = await Item.findOneByOrFail({ id: itemId }).catch(
    throwNotFoundError,
  );
  const user = await User.findOneByOrFail({ uuid: userId }).catch(
    throwNotFoundError,
  );
  await user.unassignItem(item).catch(throwDBError);
  return user.toSafeOutput();
};
