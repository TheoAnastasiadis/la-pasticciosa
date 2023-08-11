import { placeOrderController } from "../../../controllers/order/placeOrder.controller";
import { order } from "../../../entities/decoders/order.decoder";
import { orderProps } from "../../../useCases/order/requestOrder";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";
import { z } from "zod";

export const placeOrderRoute = authenticatedRoute
  .input(z.object({ props: orderProps, userId: z.string().optional() }))
  .output(order)
  .mutation(async ({ input, ctx }) => {
    let { props, userId } = input;
    const { user } = ctx.session;
    if (typeof userId === "undefined") userId = user.uuid; // simple users do not need to provide their id since it can be infered from the session
    return await placeOrderController(props, userId, user);
  });
