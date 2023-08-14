import { Order, type OrderStatus } from "../../entities/order.entity";

export const updateOrderStatus: (
  order: Order,
  newStatus: OrderStatus,
) => Promise<Order> = async (order, newStatus) => {
  await Order.update({ id: order.id }, { status: newStatus });
  order.status = newStatus;
  return order;
};
