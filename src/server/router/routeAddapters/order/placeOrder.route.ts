import { placeOrderController } from "../../../controllers/order/placeOrder.controller";
import { delivery } from "../../../entities/decoders/delivery.decoder";
import { item } from "../../../entities/decoders/item.decoder";
import { user } from "../../../entities/decoders/user.decoder";
import { orderProps } from "../../../useCases/order/requestOrder";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";
import { z } from "zod";

export const placeOrderRoute = authenticatedRoute
  .input(z.object({ props: orderProps, userId: z.string().optional() }))
  .output(
    z.object({
      id: z.coerce.string(),
      user: user.omit({ password: true, catalogue: true }),
      total: z.string(),
      status: z.union([
        z.literal("pending"),
        z.literal("accepted"),
        z.literal("in_preparation"),
        z.literal("complete"),
      ]),
      delivery: delivery.omit({ user: true }),
      estimatedDelivery: z.coerce.date(),
      quantities: z.array(z.object({ value: z.coerce.number(), item })),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    let { props, userId } = input;
    const { user } = ctx.session;
    if (typeof userId === "undefined") userId = user.uuid; // simple users do not need to provide their id since it can be infered from the session
    return await placeOrderController(props, userId, user);
  });
