import { Item } from "../../entities/item.entity";
import { deleteItem } from "../../useCases/items/deleteItem";
import { throwDBError } from "../errors/db.error";
import { throwNotFoundError } from "../errors/notFound.error";

export const deleteItemController: (itemId: string) => Promise<void> = async (
  itemId,
) => {
  const item = await Item.findOneByOrFail({ id: itemId }).catch(
    throwNotFoundError,
  );
  await deleteItem(item).catch(throwDBError);
};
