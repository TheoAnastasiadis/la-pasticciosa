import { User } from "../../../../entities/user";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Session } from "../../../../entities/session";
import moment from "moment";
import { userProps } from "../../../../validators";

export const login = procedure
  .meta({ secure: false, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .input(userProps.pick({ email: true, password: true }))
  .output(z.void())
  .query(async ({ input, ctx }) => {
    const user = await User.findOneByOrFail({ email: input.email });

    if (!user.validatePassword(input.password))
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message:
          "Email and password do not match. Please check your credentials and try again.",
      });

    const session = await Session.create({
      user,
      deletedAt: moment().add(1, "M").toDate(),
    }).save();

    ctx.setCookie("sessionId", session.id, {
      httpOnly: true,
      expires: moment().add(1, "M").toDate(),
    });
  });
