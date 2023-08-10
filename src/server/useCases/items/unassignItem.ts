import type { Item } from "../../entities/item.entity";
import type { User } from "../../entities/user.entity";

export const unassignItem: (user: User, item: Item) => Promise<User> = async (
  user,
  item,
) => {
  await user.unassignItem(item);
  return user;
};
