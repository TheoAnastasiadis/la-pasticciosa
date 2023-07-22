import { updateOrderStatusController } from "../../../controllers/order/updateOrderStatus.controller";
import { OrderStatus } from "../../../entities/order.entity";
import { publicProcedure } from "../../trpc";
import { z } from "zod";

export const updateOrderStatusRoute = publicProcedure
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
  .meta({ requiresAuth: true, adminOnly: false })
  .mutation(async ({ input }) => {
    const { orderId, status } = input;
    return await updateOrderStatusController(orderId, status);
  });
