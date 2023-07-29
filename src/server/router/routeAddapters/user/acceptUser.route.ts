import { z } from "zod";
import { acceptUserController } from "../../../controllers/user/acceptUser.controller";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";
import { user } from "../../../entities/decoders/user.decoder";

export const acceptUserRoute = adminOnlyRoute
  .input(z.coerce.string())
  .output(user)
  .mutation(async ({ input }) => {
    const uuid = input;
    return await acceptUserController(uuid);
  });
