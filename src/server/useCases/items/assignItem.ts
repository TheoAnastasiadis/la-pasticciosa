import { AppDataSource } from "../../database/dataSource";
import { type Item } from "../../entities/item.entity";
import { type User } from "../../entities/user.entity";

export const assignItem: (item: Item, user: User) => Promise<User> = async (
  item,
  user,
) => {
  user.catalogue = [...(user.catalogue.length > 0 ? user.catalogue : []), item];
  return await AppDataSource.manager.save(user);
};
