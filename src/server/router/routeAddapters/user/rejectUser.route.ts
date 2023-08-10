import { rejectUserController } from "../../../controllers/user/rejectUser.controller";
import { user } from "../../../entities/decoders/user.decoder";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";
import { z } from "zod";

export const rejectUserRoute = adminOnlyRoute
  .output(user)
  .input(z.string())
  .mutation(async ({ input }) => {
    const uuid = input;
    return await rejectUserController(uuid);
  });
