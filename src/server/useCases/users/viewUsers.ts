import { User, UserType } from "../../entities/user.entity";

export const viewUsers: () => Promise<User[]> = async () =>
  await User.find({
    where: {
      type: UserType.USER,
    },
  });
