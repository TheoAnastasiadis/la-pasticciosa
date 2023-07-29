import { User, UserStatus } from "../../entities/user.entity";

export const acceptUser: (user: User) => Promise<User> = async (user) => {
  await User.update({ uuid: user.uuid }, { status: UserStatus.ACCEPTED });
  await user.reload();
  return user;
};
