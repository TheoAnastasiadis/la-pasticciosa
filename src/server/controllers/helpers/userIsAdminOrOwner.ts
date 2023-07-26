import { TRPCError } from "@trpc/server";
import { type User, UserType } from "../../entities/user.entity";

const userIsAdminOrOwner: (user: User, id: string) => boolean = (user, id) =>
  user.type === UserType.ADMIN || user.uuid === id;

export const assertUserIsAsminOrOwner: (user: User, id: string) => void = (
  user,
  id,
) => {
  if (!userIsAdminOrOwner(user, id))
    throw new TRPCError({ code: "UNAUTHORIZED" });
};
