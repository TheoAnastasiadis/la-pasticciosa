import { userRepo } from "../../database/repos/user.repo";
import { type User, UserType } from "../../entities/user.entity";

export const viewUsers: () => Promise<User[]> = async () =>
  await userRepo.find({
    where: {
      type: UserType.USER,
    },
  });
