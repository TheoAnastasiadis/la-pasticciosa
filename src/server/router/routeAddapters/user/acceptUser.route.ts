import { z } from "zod";
import { acceptUserController } from "../../../controllers/user/acceptUser.controller";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";

export const acceptUserRoute = adminOnlyRoute
  .input(z.coerce.string())
  .mutation(async ({ input }) => {
    const uuid = input;
    return await acceptUserController(uuid);
  });
