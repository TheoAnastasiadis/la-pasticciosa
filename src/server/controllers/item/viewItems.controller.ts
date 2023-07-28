import type { Item } from "../../entities/item.entity";
import { viewItems } from "../../useCases/items/viewItems";
import { throwDBError } from "../helpers/throwDBError";

export const viewItemsController: () => Promise<Item[]> = async () => {
  return await viewItems().catch(throwDBError);
};
