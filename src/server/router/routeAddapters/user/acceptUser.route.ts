import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { acceptUserController } from "../../../controllers/user/acceptUser.controller";

export const acceptUserRoute = publicProcedure
  .input(z.string())
  .meta({ requiresAuth: true, adminOnly: true })
  .mutation(async ({ input }) => {
    const uuid = input;
    return await acceptUserController(uuid);
  });
