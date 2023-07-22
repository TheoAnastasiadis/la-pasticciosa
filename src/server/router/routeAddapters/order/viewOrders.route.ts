import { viewOrdersController } from "../../../controllers/order/viewOrders.controller";
import { publicProcedure } from "../../trpc";
import { z } from "zod";

export const viewOrdersRoute = publicProcedure
  .input(z.string().optional())
  .meta({ requiresAuth: true, adminOnly: false })
  .query(async ({ input, ctx }) => {
    const userId = typeof input !== "undefined" ? input : ctx.user.uuid;
    return await viewOrdersController(userId);
  });
