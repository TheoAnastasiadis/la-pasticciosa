import { type User, UserType } from "../../entities/user.entity";

export const assertUserIsAdmin: (user: User) => boolean = (user) =>
  user.type === UserType.ADMIN;
