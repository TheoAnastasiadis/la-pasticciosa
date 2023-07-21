import { userRepo } from "../../database/repos/user.repo";
import { User } from "../../entities/user.entity";

export const viewAssignedItems = async (user: User) => {
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
