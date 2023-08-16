import { viewOrdersController } from "../../../controllers/order/viewOrders.controller";
import { delivery } from "../../../entities/decoders/delivery.decoder";
import { item } from "../../../entities/decoders/item.decoder";
import { user } from "../../../entities/decoders/user.decoder";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";
import { z } from "zod";

export const viewOrdersRoute = authenticatedRoute
  .output(
    z.array(
      z.object({
        id: z.coerce.string(),
        total: z.string(),
        status: z.union([
          z.literal("pending"),
          z.literal("accepted"),
          z.literal("in_preparation"),
          z.literal("complete"),
        ]),
        estimatedDelivery: z.union([z.coerce.date(), z.null()]),
        createdAt: z.date(),
        user: user.omit({ catalogue: true, password: true }),
        quantities: z.array(z.object({ value: z.coerce.number(), item })),
        delivery: delivery.omit({ user: true }),
      }),
    ),
  )
  .query(async ({ ctx }) => {
    const { user } = ctx.session;
    return await viewOrdersController(user);
  });
