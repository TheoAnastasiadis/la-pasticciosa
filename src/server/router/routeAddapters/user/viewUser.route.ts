import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { viewUserController } from "../../../controllers/user/viewUser.controller";

export const viewUserRoute = publicProcedure
  .input(z.string())
  .meta({ requiresAuth: true, adminOnly: false })
  .query(async ({ input }) => {
    const uuid = input;
    return await viewUserController(uuid);
  });
