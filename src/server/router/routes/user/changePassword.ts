import { TRPCError } from "@trpc/server";
import { throwNotFoundError } from "../../errors/notFound.error";
import { User } from "../../../entities/user";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { z } from "zod";
import { throwDBError } from "../../errors/db.error";
import { userPasswordParser } from "../../validators";

export const changePassword = procedure
  .meta({ secure: true, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .input(
    z.object({
      oldPassword: userPasswordParser,
      newPassword: userPasswordParser,
    }),
  )
  .output(z.void())
  .mutation(async ({ input, ctx: { onBehalf } }) => {
    const user = await User.findOneByOrFail({ uuid: onBehalf }).catch(
      throwNotFoundError,
    );

    if (user.validatePassword(input.oldPassword)) {
      user.password = input.newPassword;
      await user.save().catch(throwDBError); // password hashing will be dealt with the @beforUpdate hook
    } else
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message:
          "The password provided is not correct. Please check your login credentials.",
      });
  });
