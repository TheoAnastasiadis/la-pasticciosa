import type { order } from "../../entities/decoders/order.decoder";
import { Order, type OrderStatus } from "../../entities/order.entity";
import { updateOrderStatus } from "../../useCases/order/updateOrderStatus";
import { throwNotFoundError } from "../errors/notFound.error";
import type { z } from "zod";

export const updateOrderStatusController: (
  id: string,
  status: OrderStatus,
) => Promise<z.infer<typeof order>> = async (id, status) => {
  const order = await Order.findById(id).catch(throwNotFoundError);
  return (await updateOrderStatus(order, status)).toSafeOutput();
};
