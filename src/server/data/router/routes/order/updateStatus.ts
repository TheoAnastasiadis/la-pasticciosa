import type { Delivery } from "../../../../entities/delivery";
import type { Item } from "../../../../entities/item";
import { Order } from "../../../../entities/order";
import type { Quantity } from "../../../../entities/quantity";
import type { User } from "../../../../entities/user";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { z } from "zod";
import {
  OrderStatusParser,
  orderWUserDeliveryQuantities,
} from "../../validators";

type OrderWUserDeliveryQuantities = Order & {
  user: User;
  quantities: Array<Quantity & { item: Item }>;
  delivery: Delivery;
};

export const updateStatus = procedure
  .meta({ secure: true, adminOnly: true })
  .use(authenticate)
  .use(authorize)
  .input(
    z.object({
      orderId: z.string(),
      status: OrderStatusParser,
    }),
  )
  .output(orderWUserDeliveryQuantities)
  .mutation(async ({ input }) => {
    const { orderId, status } = input;

    // assert order exists
    const order = await Order.findOneOrFail({
      where: { id: orderId },
      relations: { user: true, quantities: { item: true }, delivery: true },
    });

    // update db
    await Order.update({ id: orderId }, { status });

    // update object and return
    order.status = status;
    return order as OrderWUserDeliveryQuantities;
  });
