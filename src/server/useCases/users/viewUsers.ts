import { Not } from "typeorm";
import { User, UserStatus, UserType } from "../../entities/user.entity";

export const viewUsers: () => Promise<User[]> = async () =>
  await User.find({
    where: {
      type: UserType.USER,
      status: Not(UserStatus.REJECTED),
    },
    order: {
      uuid: "DESC",
    },
  });
