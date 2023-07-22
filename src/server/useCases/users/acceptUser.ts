import { type User, UserStatus } from "../../entities/user.entity";

export const acceptUser: (user: User) => Promise<User> = async (user) => {
  user.status = UserStatus.ACCEPTED;
  return await user.save();
};
