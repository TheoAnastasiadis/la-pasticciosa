import type { Order } from "../../entities/order.entity";

export const updateOrderEstimate: (
  order: Order,
  timestamp: Date,
) => Promise<Order> = async (order, timestamp) => {
  order.estimatedDelivery = timestamp.toISOString();
  return await order.save();
};
