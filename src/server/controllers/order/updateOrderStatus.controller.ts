import type { Order, OrderStatus } from "../../entities/order.entity";
import { updateOrderStatus } from "../../useCases/order/updateOrderStatus";
import { assertExists } from "../helpers/assertExists";
import { fetchOrder } from "../helpers/fetchOrder";

export const updateOrderStatusController: (
  id: string,
  status: OrderStatus,
) => Promise<Order> = async (id, status) => {
  const order = await fetchOrder(id);
  assertExists<Order>(order);
  return await updateOrderStatus(order, status);
};
