import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { viewUserController } from "../../../controllers/user/viewUser.controller";

export const viewUserRoute = publicProcedure
  .input(z.string().optional())
  .meta({ requiresAuth: true, adminOnly: false })
  .query(async ({ input, ctx }) => {
    const uuid = typeof input !== "undefined" ? input : ctx.user.uuid;
    return await viewUserController(uuid);
  });
