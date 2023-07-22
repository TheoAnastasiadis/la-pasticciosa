import { itemRepo } from "../../database/repos/item.repo";
import type { Item } from "../../entities/item.entity";
import { throwDBError } from "./throwDBError";

export const fetchItem: (id: string) => Promise<Item | null> = async (id) =>
  await itemRepo.findOneBy({ id }).catch(throwDBError);
