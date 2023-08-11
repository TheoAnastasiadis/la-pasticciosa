import type { User } from "../../entities/user.entity";

export const changeUserPassword: (
  user: User,
  newPassword: string,
) => Promise<User> = async (user, newPassword) => {
  user.password = newPassword;
  return await user.save();
};
