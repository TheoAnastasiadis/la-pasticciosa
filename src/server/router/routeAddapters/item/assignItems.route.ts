import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { assignItemController } from "../../../controllers/item/assignItem.controller";

export const assignItemsRoute = publicProcedure
  .input(z.object({ userId: z.string(), itemId: z.string() }))
  .meta({ requiresAuth: true, adminOnly: true })
  .mutation(async ({ input }) => {
    const { userId, itemId } = input;
    return await assignItemController(itemId, userId);
  });
