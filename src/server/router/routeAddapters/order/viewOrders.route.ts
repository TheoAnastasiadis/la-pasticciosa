import { viewOrdersController } from "../../../controllers/order/viewOrders.controller";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";

export const viewOrdersRoute = authenticatedRoute.query(async ({ ctx }) => {
  const { user } = ctx.session;
  return await viewOrdersController(user);
});
