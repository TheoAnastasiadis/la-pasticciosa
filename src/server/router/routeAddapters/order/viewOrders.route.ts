import { viewOrdersController } from "../../../controllers/order/viewOrders.controller";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";
import { z } from "zod";

export const viewOrdersRoute = authenticatedRoute
  .input(z.string().optional())
  .query(async ({ input, ctx }) => {
    const userId = input ?? ctx.session.user.uuid;
    return await viewOrdersController(userId);
  });
