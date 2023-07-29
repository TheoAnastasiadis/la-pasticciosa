import type { Item } from "../../entities/item.entity";
import { User } from "../../entities/user.entity";

export const viewAssignedItems: (userId: string) => Promise<Item[]> = async (
  userId,
) => {
  const [result] = await User.find({
    where: {
      uuid: userId,
    },
    relations: {
      catalogue: true,
    },
  });
  return result.catalogue;
};
