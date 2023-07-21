import { AppDataSource } from "../../database/dataSource";
import { userRepo } from "../../database/repos/user.repo";
import { Item } from "../../entities/item.entity";
import { User } from "../../entities/user.entity";

export const assignItem = (item: Item, user: User) => {
  user.catalogue = [...(user.catalogue || []), item];
  return AppDataSource.manager.save(user);
};
