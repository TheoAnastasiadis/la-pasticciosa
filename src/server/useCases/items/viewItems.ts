import { itemRepo } from "../../database/repos/item.repo";
import type { Item } from "../../entities/item.entity";

export const viewItems: () => Promise<Item[] | undefined> = async () =>
  await itemRepo.find();
