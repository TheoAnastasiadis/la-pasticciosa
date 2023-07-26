import { orderRepo } from "../../database/repos/order.repo";
import type { Delivery } from "../../entities/delivery.entity";
import type { Item } from "../../entities/item.entity";
import { OrderStatus, type Order } from "../../entities/order.entity";
import type { User } from "../../entities/user.entity";

export const requestOrder: (
  items: Item[],
  user: User,
  delivery: Delivery,
) => Promise<Order> = async (items, user, delivery) => {
  const total = items.map((item) => item.price).reduce((s, c) => s + c);
  const status = OrderStatus.PENDING;
  const order = orderRepo.create({ user, delivery, total, status, items });
  await orderRepo.insert(order);
  return await order.recover();
};
