import { userRepo } from "../../database/repos/user.repo";
import type { Item } from "../../entities/item.entity";

export const viewAssignedItems: (
  userId: string,
) => Promise<Item[] | undefined> = async (userId) => {
  const result = await userRepo.findOne({
    where: {
      uuid: userId,
    },
    relations: {
      catalogue: true,
    },
  });
  return result?.catalogue;
};
