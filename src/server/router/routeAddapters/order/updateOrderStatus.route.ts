import { updateOrderStatusController } from "../../../controllers/order/updateOrderStatus.controller";
import { OrderStatus } from "../../../entities/order.entity";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";
import { z } from "zod";

export const updateOrderStatusRoute = adminOnlyRoute
  .input(
    z.object({
      orderId: z.string(),
      status: z.enum([
        OrderStatus.COMPLETE,
        OrderStatus.PENDING,
        OrderStatus.ACCEPTED,
        OrderStatus.PREPARATION,
      ]),
    }),
  )
  .mutation(async ({ input }) => {
    const { orderId, status } = input;
    return await updateOrderStatusController(orderId, status);
  });
