import { itemRepo } from "../../database/repos/item.repo";
import { throwDBError } from "./throwDBError";

export const fetchItem = (id: string) =>
  itemRepo.findOneBy({ id }).catch(throwDBError);
