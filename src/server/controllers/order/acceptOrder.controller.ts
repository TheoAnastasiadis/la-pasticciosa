import { type Order, OrderStatus } from "../../entities/order.entity";
import { updateOrderStatus } from "../../useCases/order/updateOrderStatus";
import { assertExists } from "../helpers/assertExists";
import { fetchOrder } from "../helpers/fetchOrder";

export const acceptOrderController: (id: string) => Promise<Order> = async (
  id,
) => {
  const order = await fetchOrder(id);
  assertExists<Order>(order);
  return await updateOrderStatus(order, OrderStatus.ACCEPTED);
};
