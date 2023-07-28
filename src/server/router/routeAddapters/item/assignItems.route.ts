import { z } from "zod";
import { assignItemController } from "../../../controllers/item/assignItem.controller";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";

export const assignItemsRoute = adminOnlyRoute
  .input(z.object({ userId: z.coerce.string(), itemId: z.coerce.string() }))
  .mutation(async ({ input }) => {
    const { userId, itemId } = input;
    return await assignItemController(itemId, userId);
  });
