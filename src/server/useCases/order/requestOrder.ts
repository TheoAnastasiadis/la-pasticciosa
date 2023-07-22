import { orderRepo } from "../../database/repos/order.repo";
import type { Order } from "../../entities/order.entity";

export const requestOrder: (order: Order) => Promise<Order> = async (order) => {
  await orderRepo.insert(order);
  return await order.recover();
};
