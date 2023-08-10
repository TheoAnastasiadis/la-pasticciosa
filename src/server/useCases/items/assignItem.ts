import { type Item } from "../../entities/item.entity";
import { type User } from "../../entities/user.entity";

export const assignItem: (item: Item, user: User) => Promise<User> = async (
  item,
  user,
) => {
  await user.assignItem(item);
  return user;
};
