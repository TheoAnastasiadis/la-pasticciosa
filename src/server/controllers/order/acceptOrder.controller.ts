import type { order } from "../../entities/decoders/order.decoder";
import { Order, OrderStatus } from "../../entities/order.entity";
import { updateOrderStatus } from "../../useCases/order/updateOrderStatus";
import { throwNotFoundError } from "../errors/notFound.error";
import type { z } from "zod";

export const acceptOrderController: (
  id: string,
) => Promise<z.infer<typeof order>> = async (id) => {
  const order = await Order.findById(id).catch(throwNotFoundError);
  return (await updateOrderStatus(order, OrderStatus.ACCEPTED)).toSafeOutput();
};
