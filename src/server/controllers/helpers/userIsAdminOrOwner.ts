import { TRPCError } from "@trpc/server";
import { type User, UserType, UserStatus } from "../../entities/user.entity";

const userIsAdminOrOwner: (user: User, id: string) => boolean = (user, id) =>
  user.type === UserType.ADMIN || user.uuid === id;

export const assertUserIsAdminOrAcceptedOwner: (
  user: User,
  id: string,
) => void = (user, id) => {
  if (!userIsAdminOrOwner(user, id) || user.status !== UserStatus.ACCEPTED)
    throw new TRPCError({ code: "UNAUTHORIZED" });
};
