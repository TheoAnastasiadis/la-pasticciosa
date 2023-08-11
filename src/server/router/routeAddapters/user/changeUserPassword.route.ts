import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";
import { user } from "../../../entities/decoders/user.decoder";
import { z } from "zod";
import { changeUserPasswordController } from "../../../controllers/user/changeUserPassword.controller";

export const changeUserPasswordRoute = authenticatedRoute
  .input(
    z.object({
      newCreds: z.object({ password: z.string() }),
      oldCreds: user.pick({ password: true }),
    }),
  )
  .output(user)
  .mutation(async ({ ctx, input }) => {
    const oldPassword = input.oldCreds.password;
    const newPassword = input.newCreds.password;
    const { user } = ctx.session;
    return await changeUserPasswordController(user, oldPassword, newPassword);
  });
