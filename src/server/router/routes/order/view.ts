import { throwNotFoundError } from "../../errors/notFound.error";
import type { Delivery } from "../../../entities/delivery";
import type { Item } from "../../../entities/item";
import { Order } from "../../../entities/order";
import type { Quantity } from "../../../entities/quantity";
import { User } from "../../../entities/user";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { z } from "zod";
import { orderWUserDeliveryQuantities } from "../../validators";
import appConfig from "../../../config/app.config";

const PAGINATION_LIMIT = appConfig.getPaginationLimit();

export const view = procedure
  .meta({ secure: true, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .input(z.object({ page: z.number() }))
  .output(z.array(orderWUserDeliveryQuantities))
  .query(async ({ ctx, input }) => {
    const user = await User.findOneByOrFail({ uuid: ctx.onBehalf }).catch(
      throwNotFoundError,
    );

    if (user.isAdmin())
      // admin is shown all orders by descendind creation
      return (await Order.find({
        relations: {
          delivery: true,
          user: true,
          quantities: { item: true, order: true },
        },
        order: { createdAt: "DESC" },
        take: PAGINATION_LIMIT,
        skip: input.page * PAGINATION_LIMIT,
      })) as Array<
        Order & {
          user: User;
          quantities: Array<Quantity & { item: Item }>;
          delivery: Delivery;
        }
      >;

    // users are shown only their own orders
    return (await Order.find({
      where: { user: { uuid: user.uuid } },
      relations: {
        delivery: true,
        user: true,
        quantities: { item: true, order: true },
      },
      order: { createdAt: "DESC" },
      take: PAGINATION_LIMIT,
      skip: input.page * PAGINATION_LIMIT,
    })) as Array<
      Order & {
        user: User;
        quantities: Array<Quantity & { item: Item }>;
        delivery: Delivery;
      }
    >;
  });
