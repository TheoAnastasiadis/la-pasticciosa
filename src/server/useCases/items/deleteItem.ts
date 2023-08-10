import type { Item } from "../../entities/item.entity";

export const deleteItem: (item: Item) => Promise<void> = async (item) => {
  await item.softRemove();
};
