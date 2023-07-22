import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { viewUserProfileController } from "../../../controllers/user/viewUserProfile.controller";

export const viewUserProfileRoute = publicProcedure
  .input(z.string().optional())
  .meta({ requiresAuth: true, adminOnly: false })
  .query(async ({ input, ctx }) => {
    const uuid = typeof input !== "undefined" ? input : ctx.user.uuid;
    return await viewUserProfileController(uuid);
  });
