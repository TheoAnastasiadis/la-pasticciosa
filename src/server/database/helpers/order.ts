import type { z } from "zod";
import type { requestOrderProps } from "../../router/validators";
import type { Delivery } from "../../entities/delivery";
import type { Item } from "../../entities/item";
import { Order, OrderStatus } from "../../entities/order";
import type { User } from "../../entities/user";
import { createNewQuantity } from "./quantity";

export async function createNewOrder(
  props: z.infer<typeof requestOrderProps>,
  user: User,
  delivery: Delivery,
  quantities: Array<{ item: Item; value: number }>,
): Promise<Order> {
  const order = Order.create(props as unknown as Order);
  order.user = user;
  order.delivery = delivery;
  order.status = OrderStatus.PENDING; // oders are initialized in pending status
  await order.save();
  order.quantities = await Promise.all(
    quantities.map(
      async ({ item, value }) => await createNewQuantity(item, value, order),
    ),
  );
  return await order.save();
}
