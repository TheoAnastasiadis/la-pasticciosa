import { type User, UserStatus } from "../../entities/user.entity";

export const rejectUser: (user: User) => Promise<User> = async (user) => {
  user.status = UserStatus.REJECTED;
  await user.save();
  return user;
};
