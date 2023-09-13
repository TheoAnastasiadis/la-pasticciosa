import { z } from "zod";
import { userWNoPasswordOrCatalogue } from "./user";
import { deliveryWNoUser } from "./delivery";
import { itemProps } from "./item";
import { OrderStatus } from "../entities/order";

export const OrderStatusParser = z.enum([
  OrderStatus.COMPLETE,
  OrderStatus.PENDING,
  OrderStatus.ACCEPTED,
  OrderStatus.PREPARATION,
  OrderStatus.ACCEPTED,
]);

export const orderProps = z.object({
  id: z.coerce.string(),
  user: z.coerce.string(),
  delivery: z.coerce.string(),
  quantities: z.array(
    z.object({ item: z.coerce.string(), value: z.coerce.number() }),
  ),
  total: z.coerce.string(),
  status: OrderStatusParser,
  estimatedDelivery: z.coerce.date().optional(),
  createdAt: z.date(),
});

export const requestOrderProps = orderProps.omit({
  id: true,
  user: true,
  delivery: true,
  quantities: true,
  createdAt: true,
});

export const orderWUserDeliveryQuantities = orderProps
  .omit({
    user: true,
    quantities: true,
    delivery: true,
  })
  .merge(
    z.object({
      user: userWNoPasswordOrCatalogue,
    }),
  )
  .merge(
    z.object({
      quantities: z.array(
        z.object({ item: itemProps, value: z.coerce.number() }),
      ),
    }),
  )
  .merge(z.object({ delivery: deliveryWNoUser }));
