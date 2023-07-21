import { User, UserStatus } from "../../entities/user.entity";

export const acceptUser = (user: User) => {
  user.status = UserStatus.ACCEPTED;
  return user.save();
};
