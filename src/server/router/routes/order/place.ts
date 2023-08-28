import { TRPCError } from "@trpc/server";
import { throwNotFoundError } from "../../errors/notFound.error";
import { Delivery, DeliveryStatus } from "../../../entities/delivery";
import { Item } from "../../../entities/item";
import { User } from "../../../entities/user";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { type Order, OrderStatus } from "../../../entities/order";
import assert from "assert";
import type { Quantity } from "../../../entities/quantity";
import {
  RequestQuantityProps,
  orderWUserDeliveryQuantities,
  requestOrderProps,
} from "../../validators";
import { createNewOrder } from "../../../database/helpers/order";
import { z } from "zod";

export const placeOrder = procedure
  .meta({ secure: true, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .input(
    requestOrderProps.merge(
      z.object({
        quantities: z.array(RequestQuantityProps),
        deliveryId: z.string(),
      }),
    ),
  )
  .output(orderWUserDeliveryQuantities)
  .mutation(async ({ input, ctx }) => {
    const { onBehalf } = ctx;

    const user = await User.findOneByOrFail({ uuid: onBehalf }).catch(
      throwNotFoundError,
    );
    assert(user.catalogue);

    // validate delivery
    const delivery = await Delivery.findOneOrFail({
      where: { id: input.deliveryId },
      relations: { user: { catalogue: true } },
    }).catch(throwNotFoundError);
    assert(delivery.user);
    assert(delivery.user.catalogue);

    if (
      delivery.user.uuid !== user.uuid ||
      delivery.state !== DeliveryStatus.ACCEPTED
    )
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message:
          "The requested delivery location has not been accepted for this user.",
      });

    // validate items
    if (input.quantities.length <= 0)
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: "Orders must contain at least on item.",
      });
    const itemsAreAssigned = input.quantities.every(({ item }) =>
      (user.catalogue as Item[])
        .map((catalogueItem) => catalogueItem.id)
        .includes(item),
    );

    if (!itemsAreAssigned)
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: "The requested items arre not assigned for this user.",
      });

    // Calculate order total as item.price * quantity.value
    const richQuantities = await Promise.all(
      input.quantities.map(async ({ item, value }) => {
        const richItem = await Item.findOneByOrFail({ id: item }).catch(
          throwNotFoundError,
        );
        return { item: richItem, value };
      }),
    );
    const total = richQuantities
      .map(
        ({ item, value }) =>
          parseFloat(item.price) * parseInt(value.toString()),
      )
      .reduce((total, addition) => total + addition)
      .toFixed(2);

    // update the db and return result as response
    const order = await createNewOrder(
      {
        status: OrderStatus.PENDING,
        total,
        estimatedDelivery: undefined,
      },
      user,
      delivery,
      richQuantities,
    );
    assert(order.user);
    assert(order.quantities);
    assert(order.delivery);
    return order as Order & {
      user: User;
      quantities: Array<Quantity & { item: Item }>;
      delivery: Delivery;
    };
  });
