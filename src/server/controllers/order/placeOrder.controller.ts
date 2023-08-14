import type { z } from "zod";
import { User } from "../../entities/user.entity";
import { Item } from "../../entities/item.entity";
import {
  type orderProps,
  requestOrder,
} from "../../useCases/order/requestOrder";
import { assertUserIsAdminOrAcceptedOwner } from "../helpers/userIsAdminOrOwner";
import { Delivery } from "../../entities/delivery.entity";
import type { order } from "../../entities/decoders/order.decoder";
import { throwNotFoundError } from "../errors/notFound.error";
import { throwDBError } from "../errors/db.error";

export const placeOrderController: (
  props: z.infer<typeof orderProps>,
  userId: string,
  caller: User,
) => Promise<z.infer<typeof order>> = async (props, userId, caller) => {
  // user
  // Admins can create orders on behalf of any user.
  // Simple users can create orders only on their own behalf.
  const user = await User.findById(userId).catch(throwNotFoundError);
  assertUserIsAdminOrAcceptedOwner(caller, userId);
  // items
  const items = await Promise.all(
    props.quantities.map(
      async ({ item }) => await Item.findOneByOrFail({ id: item }),
    ),
  ).catch(throwNotFoundError);
  const quantities = props.quantities.map(({ value }, i) => ({
    item: items[i],
    value,
  }));
  // delivery
  // Admins can choose any delivery.
  // Simple users can only choose of their own deliveries.
  const [delivery] = await Delivery.find({
    where: { id: props.delivery },
    relations: { user: true },
  }).catch(throwNotFoundError);
  assertUserIsAdminOrAcceptedOwner(caller, delivery.user.uuid);
  // main
  return (
    await requestOrder(quantities, user, delivery).catch(throwDBError)
  ).toSafeOutput();
};
