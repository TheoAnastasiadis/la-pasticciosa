import { Delivery } from "../../../../entities/delivery";
import { Item } from "../../../../entities/item";
import { User } from "../../../../entities/user";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { Order, OrderStatus } from "../../../../entities/order";
import { Quantity } from "../../../../entities/quantity";
import {
  RequestQuantityProps,
  orderWUserDeliveryQuantities,
} from "../../../../validators";
import { z } from "zod";
import businessLogic from "../../../businessLogic/order";
import { AppDataSource } from "../../../../database";
import { TRPCError } from "@trpc/server";

const orderInput = z.object({
  quantityIds: z.array(RequestQuantityProps),
  deliveryId: z.coerce.string(),
});

type OrderWUserDeliveryQuantities = Order & {
  user: User;
  quantities: Array<Quantity & { item: Item }>;
  delivery: Delivery;
};

export const placeOrder = procedure
  .meta({ secure: true, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .input(orderInput)
  .output(orderWUserDeliveryQuantities)
  .mutation(async ({ input, ctx }) => {
    const { onBehalf } = ctx;

    const [user, delivery] = await Promise.all([
      User.findOneByOrFail({ uuid: onBehalf }),
      Delivery.findOneOrFail({
        where: { id: input.deliveryId },
        relations: { user: { catalogue: true } },
      }),
    ]);

    businessLogic.validate(user, input.quantityIds, delivery);

    const quantities = await Promise.all(
      input.quantityIds.map(
        async ({ item, value }) =>
          await Item.findOneByOrFail({ id: item }).then((item) => ({
            item,
            value,
          })),
      ),
    );

    const total = businessLogic.calculateTotal(quantities);

    // update the db and return result as response
    const runner = AppDataSource.createQueryRunner();
    await runner.startTransaction();
    let order: Order | undefined;
    try {
      order = runner.manager.create(Order, {
        total,
        estimatedDelivery: undefined,
        status: OrderStatus.PENDING,
        user,
        delivery,
      });
      await order.save();
      const orderQuantities = quantities.map(({ item, value }) =>
        runner.manager.create(Quantity, { item, value, order }),
      );
      await Promise.all(
        orderQuantities.map(async (quantity) => await quantity.save()),
      );
      order.quantities = orderQuantities;
      await order.save();
    } catch (e) {
      await runner.rollbackTransaction();
    } finally {
      await runner.release();
    }

    if (typeof order === "undefined")
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database could not succeed in placing the new order.",
      });
    return order as OrderWUserDeliveryQuantities;
  });
