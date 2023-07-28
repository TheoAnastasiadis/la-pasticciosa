import { TRPCError } from "@trpc/server";
import { orderRepo } from "../../database/repos/order.repo";
import { DeliveryStatus, type Delivery } from "../../entities/delivery.entity";
import type { Item } from "../../entities/item.entity";
import type { User } from "../../entities/user.entity";
import { Order, OrderStatus } from "../../entities/order.entity";
import { AppDataSource } from "../../database/dataSource";

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
    .map((item) => user.catalogue.includes(item))
    .reduce((p, c) => p && c);
  if (!itemsAreAssigned) throw new TRPCError({ code: "PRECONDITION_FAILED" });

  const total = items
    .map((item) => parseFloat(item.price))
    .reduce((s, c) => s + c)
    .toFixed(2);

  const status = OrderStatus.PENDING;
  const order = orderRepo.create({ total, status });
  await orderRepo.insert(order);
  await order.reload();
  order.user = user;
  order.delivery = delivery;
  order.items = items;
  return await AppDataSource.manager.save(Order, order);
};
