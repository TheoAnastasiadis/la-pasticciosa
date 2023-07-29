import { z } from "zod";
import { assignItemController } from "../../../controllers/item/assignItem.controller";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";
import { user } from "../../../entities/decoders/user.decoder";

export const assignItemsRoute = adminOnlyRoute
  .input(z.object({ userId: z.coerce.string(), itemId: z.coerce.string() }))
  .output(user)
  .mutation(async ({ input }) => {
    const { userId, itemId } = input;
    return await assignItemController(itemId, userId);
  });
