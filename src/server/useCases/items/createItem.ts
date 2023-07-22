import type { InsertResult } from "typeorm";
import { itemRepo } from "../../database/repos/item.repo";
import { type Item } from "../../entities/item.entity";

export const createItem: (
  item: Omit<Item, "id">,
) => Promise<InsertResult> = async (item) => await itemRepo.insert(item);
