import { unassignItemController } from "../../../controllers/item/unassignItem.controller";
import { user } from "../../../entities/decoders/user.decoder";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";
import { z } from "zod";

export const unassignItemsRoute = adminOnlyRoute
  .input(z.object({ userId: z.string(), itemId: z.string() }))
  .output(user)
  .mutation(async ({ ctx, input }) => {
    const { userId, itemId } = input;
    return await unassignItemController(userId, itemId);
  });
