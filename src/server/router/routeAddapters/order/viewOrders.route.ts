import { viewOrdersController } from "../../../controllers/order/viewOrders.controller";
import { order } from "../../../entities/decoders/order.decoder";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";
import { z } from "zod";

export const viewOrdersRoute = authenticatedRoute
  .output(z.array(order))
  .query(async ({ ctx }) => {
    const { user } = ctx.session;
    return await viewOrdersController(user);
  });
