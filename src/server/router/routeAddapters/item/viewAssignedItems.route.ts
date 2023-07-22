import { publicProcedure } from "../../trpc";
import { z } from "zod";
import { viewAssignedItemsController } from "../../../controllers/item/viewAssignedItems.controller";

export const viewAssignedItemsRoute = publicProcedure
  .input(z.string())
  .meta({ requiresAuth: true, adminOnly: false })
  .query(async ({ input }) => {
    const userId = input;
    return await viewAssignedItemsController(userId);
  });
