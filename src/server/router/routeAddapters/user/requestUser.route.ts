import { publicProcedure } from "../../trpc";
import { user } from "../../../entities/decoders/user.decoder";
import { requestUserController } from "../../../controllers/user/requestUser.controller";

export const requestUserRoute = publicProcedure
  .input(user.omit({ uuid: true, type: true, status: true, catalogue: true }))
  .output(user)
  .mutation(async ({ input }) => {
    const user = input;
    return await requestUserController(user);
  });
