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
  quantities: Array<{ item: Item; value: number }>,
  user: User,
  delivery: Delivery,
) => Promise<Order> = async (quantities, user, delivery) => {
  console.log(`requesting order`);
  console.log(JSON.stringify(quantities, undefined, 2));

  // validate delivery
  if (
    delivery.user.uuid !== user.uuid ||
    delivery.state !== DeliveryStatus.ACCEPTED
  )
    throw new TRPCError({ code: "PRECONDITION_FAILED" });

  // validate items
  const itemsAreAssigned = quantities
    .map((q) => q.item)
    .map((item) => user.catalogue.map((c) => c.id).includes(item.id))
    .reduce((p, c) => p && c);
  if (!itemsAreAssigned) throw new TRPCError({ code: "PRECONDITION_FAILED" });

  // calculate sum as item.price * quantity.value
  const total = quantities
    .map(
      ({ item, value }) => parseFloat(item.price) * parseInt(value.toString()),
    )
    .reduce((p, c) => p + c)
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
    quantities,
  );
};
