import type { Order, OrderStatus } from "../../entities/order.entity";

export const updateOrderStatus: (
  order: Order,
  newStatus: OrderStatus,
) => Promise<Order> = async (order, newStatus) => {
  order.status = newStatus;
  return await order.save();
};
