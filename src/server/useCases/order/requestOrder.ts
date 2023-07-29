import { TRPCError } from "@trpc/server";
import { DeliveryStatus, type Delivery } from "../../entities/delivery.entity";
import type { Item } from "../../entities/item.entity";
import type { User } from "../../entities/user.entity";
import { Order, OrderStatus } from "../../entities/order.entity";
import { order } from "../../entities/decoders/order.decoder";

export const orderProps = order.omit({
  id: true,
  user: true,
  total: true,
  status: true,
  estimatedDelivery: true,
  createdAt: true,
});

export const requestOrder: (
  items: Item[],
  user: User,
  delivery: Delivery,
) => Promise<Order> = async (items, user, delivery) => {
  // validate delivery
  if (
    delivery.user.uuid !== user.uuid ||
    delivery.state !== DeliveryStatus.ACCEPTED
  )
    throw new TRPCError({ code: "PRECONDITION_FAILED" });

  // validate items
  const itemsAreAssigned = items
    .map((item) => user.catalogue.map((c) => c.id).includes(item.id))
    .reduce((p, c) => p && c);
  if (!itemsAreAssigned) throw new TRPCError({ code: "PRECONDITION_FAILED" });

  const total = items
    .map((item) => parseFloat(item.price))
    .reduce((s, c) => s + c)
    .toFixed(2);

  const status = OrderStatus.PENDING;
  return await Order.createAndSave(
    {
      status,
      total,
      estimatedDelivery: null,
    },
    user,
    delivery,
    items,
  );
};
