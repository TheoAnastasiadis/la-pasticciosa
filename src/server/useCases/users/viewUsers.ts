import { userRepo } from "../../database/repos/user.repo";
import { userType } from "../../entities/user.entity";

export const viewUsers = () =>
  userRepo.find({
    where: {
      type: userType.USER,
    },
  });
