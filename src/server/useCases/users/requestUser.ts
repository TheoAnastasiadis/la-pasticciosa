import type { User } from "../../entities/user.entity";

export const requestUser: (user: Omit<User, "uuid">) => Promise<User> = async (
  user,
) => await user.save();
