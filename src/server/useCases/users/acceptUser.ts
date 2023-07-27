import { userRepo } from "../../database/repos/user.repo";
import { type User, UserStatus } from "../../entities/user.entity";

export const acceptUser: (user: User) => Promise<User> = async (user) => {
  await userRepo.update({ uuid: user.uuid }, { status: UserStatus.ACCEPTED });
  await user.reload();
  return user;
};
