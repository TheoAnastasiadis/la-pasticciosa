import { updateOrderStatusController } from "../../../controllers/order/updateOrderStatus.controller";
import { order } from "../../../entities/decoders/order.decoder";
import { OrderStatus } from "../../../entities/order.entity";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";
import { z } from "zod";

export const updateOrderStatusRoute = adminOnlyRoute
  .input(
    z.object({
      orderId: z.coerce.string(),
      status: z.enum([
        OrderStatus.COMPLETE,
        OrderStatus.PENDING,
        OrderStatus.ACCEPTED,
        OrderStatus.PREPARATION,
      ]),
    }),
  )
  .output(order)
  .mutation(async ({ input }) => {
    const { orderId, status } = input;
    return await updateOrderStatusController(orderId, status);
  });
