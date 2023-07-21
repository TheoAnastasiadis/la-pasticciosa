import { itemRepo } from "../../database/repos/item.repo";
import { Item } from "../../entities/item.entity";

export const createItem = (item: Omit<Item, "id">) => itemRepo.insert(item);
