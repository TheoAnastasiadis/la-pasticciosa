import { publicProcedure } from "../../trpc";
import { z } from "zod";
import { viewAssignedItemsController } from "../../../controllers/item/viewAssignedItems.controller";

export const viewAssignedItemsRoute = publicProcedure
  .input(z.string().optional())
  .meta({ requiresAuth: true, adminOnly: false })
  .query(async ({ input, ctx }) => {
    const userId = typeof input !== "undefined" ? input : ctx.user.uuid;
    return await viewAssignedItemsController(userId);
  });
