import {
  orderProps,
  placeOrderController,
} from "../../../controllers/order/placeOrder.controller";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";
import { z } from "zod";

export const placeOrderRoute = authenticatedRoute
  .input(z.object({ props: orderProps, userId: z.string().optional() }))
  .meta({ requiresAuth: true, adminOnly: false })
  .mutation(async ({ input, ctx }) => {
    const { props, userId } = input;
    const id = userId ?? ctx.session.user.uuid;
    return await placeOrderController(props, id);
  });
