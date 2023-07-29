import { placeOrderController } from "../../../controllers/order/placeOrder.controller";
import { order } from "../../../entities/decoders/order.decoder";
import { orderProps } from "../../../useCases/order/requestOrder";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";
import { z } from "zod";

export const placeOrderRoute = authenticatedRoute
  .input(z.object({ props: orderProps, userId: z.string().optional() }))
  .output(order)
  .mutation(async ({ input, ctx }) => {
    const { props, userId } = input;
    const id = userId ?? ctx.session.user.uuid;
    return await placeOrderController(props, id);
  });
