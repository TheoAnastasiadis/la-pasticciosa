import { itemRepo } from "../../database/repos/item.repo";
import { type Item } from "../../entities/item.entity";

export const createItem: (item: Omit<Item, "id">) => Promise<Item> = async (
  item,
) => {
  const id = (await itemRepo.insert(item)).generatedMaps[0].id;
  return { ...item, id };
};
