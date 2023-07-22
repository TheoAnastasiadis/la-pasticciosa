import { userRepo } from "../../database/repos/user.repo";
import type { Item } from "../../entities/item.entity";
import type { User } from "../../entities/user.entity";

export const viewAssignedItems: (
  user: User,
) => Promise<Item[] | undefined> = async (user) => {
  const result = await userRepo.findOne({
    where: {
      uuid: user.uuid,
    },
    relations: {
      catalogue: true,
    },
  });
  return result?.catalogue;
};
