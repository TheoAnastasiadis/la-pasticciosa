import type { user } from "../../entities/decoders/user.decoder";
import type { z } from "zod";
import type { User } from "../../entities/user.entity";
import { changeUserPassword } from "../../useCases/users/changeUserPassword";
import { throwDBError } from "../errors/db.error";
import { TRPCError } from "@trpc/server";

export const changeUserPasswordController: (
  userToBeEdited: User,
  currentPassword: string,
  newPassword: string,
) => Promise<z.infer<typeof user>> = async (
  userToBeEdited,
  currentPassword,
  newPassword,
) => {
  if (!userToBeEdited.validatePassword(currentPassword))
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Provided credentials could not be authenticated",
    });
  const updatedUser = await changeUserPassword(
    userToBeEdited,
    newPassword,
  ).catch(throwDBError);
  return updatedUser.toSafeOutput();
};
