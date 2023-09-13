import type { Delivery } from "../../../../entities/delivery";
import type { Item } from "../../../../entities/item";
import { Order } from "../../../../entities/order";
import type { Quantity } from "../../../../entities/quantity";
import { User } from "../../../../entities/user";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { z } from "zod";
import { orderWUserDeliveryQuantities } from "../../../../validators";
import appConfig from "../../../../config/app.config";

const PAGINATION_LIMIT = appConfig.getPaginationLimit();

type OrderWUserDeliveryQuantities = Order & {
  user: User;
  quantities: Array<Quantity & { item: Item }>;
  delivery: Delivery;
};

const findAllOrders: (
  page: number,
) => Promise<OrderWUserDeliveryQuantities[]> = async (page) =>
  (await Order.find({
    relations: {
      delivery: true,
      user: true,
      quantities: { item: true, order: true },
    },
    order: { createdAt: "DESC" },
    take: PAGINATION_LIMIT,
    skip: page * PAGINATION_LIMIT,
  })) as OrderWUserDeliveryQuantities[];

const findThisUsersOrders: (
  userId: string,
  page: number,
) => Promise<OrderWUserDeliveryQuantities[]> = async (userId, page) =>
  (await Order.find({
    where: { user: { uuid: userId } },
    relations: {
      delivery: true,
      user: true,
      quantities: { item: true, order: true },
    },
    order: { createdAt: "DESC" },
    take: PAGINATION_LIMIT,
    skip: page * PAGINATION_LIMIT,
  })) as OrderWUserDeliveryQuantities[];

export const view = procedure
  .meta({ secure: true, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .input(z.object({ page: z.number() }))
  .output(z.array(orderWUserDeliveryQuantities))
  .query(async ({ ctx, input }) => {
    const user = await User.findOneByOrFail({ uuid: ctx.onBehalf });

    if (user.isAdmin())
      // admin is shown all orders by descendind creation
      return await findAllOrders(input.page);

    // users are shown only their own orders
    return await findThisUsersOrders(user.uuid, input.page);
  });
