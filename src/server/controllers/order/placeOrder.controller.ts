import { order } from "../../entities/decoders/order.decoder";
import type { z } from "zod";
import type { User } from "../../entities/user.entity";
import { type Order, OrderStatus } from "../../entities/order.entity";
import { orderRepo } from "../../database/repos/order.repo";
import { fetchItem } from "../helpers/fetchItem";
import type { Item } from "../../entities/item.entity";
import { requestOrder } from "../../useCases/order/requestOrder";
import { throwDBError } from "../helpers/throwDBError";

export const orderProps = order.omit({
  id: true,
  user: true,
  total: true,
  status: true,
  estimatedDelivery: true,
  createdAt: true,
});

export const placeOrderController: (
  props: z.infer<typeof orderProps>,
  user: User,
) => Promise<Order> = async (props, user) => {
  const items = (await Promise.all(props.items.map(fetchItem))) as Item[];
  const total = items.map((item) => item.price).reduce((s, c) => s + c);
  const status = OrderStatus.PENDING;
  const order = orderRepo.create({ ...orderProps, user, total, status, items });
  return await requestOrder(order).catch(throwDBError);
};
