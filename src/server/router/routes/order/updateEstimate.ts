import { Order } from "../../../entities/order";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { z } from "zod";
import moment from "moment";

import type { Item } from "../../../entities/item";
import type { Delivery } from "../../../entities/delivery";
import type { Quantity } from "../../../entities/quantity";
import type { User } from "../../../entities/user";
import { orderWUserDeliveryQuantities } from "../../validators";

type OrderWUserDeliveryQuantities = Order & {
  user: User;
  quantities: Array<Quantity & { item: Item }>;
  delivery: Delivery;
};

export const updateEstimate = procedure
  .meta({ secure: true, adminOnly: true })
  .use(authenticate)
  .use(authorize)
  .input(
    z.object({
      id: z.string(),
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
  )
  .output(orderWUserDeliveryQuantities)
  .mutation(async ({ input }) => {
    const { id, day, month, year } = input;

    // assert that the order exists
    const order = await Order.findOneOrFail({
      where: { id },
      relations: { user: true, quantities: { item: true }, delivery: true },
    });

    const timestamp = moment.utc([year, month, day]).utcOffset(3);
    // update the db
    await Order.update(
      { id },
      { estimatedDelivery: timestamp.toISOString() }, // a) we store ISO strings in the DB
    );

    // update object and send response
    order.estimatedDelivery = timestamp.toDate(); // b) we return Date objects to be parsed by zod decoder
    return order as OrderWUserDeliveryQuantities;
  });
