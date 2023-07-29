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
) => Promise<z.infer<typeof order>> = async (props, userId) => {
  // user
  const user = await User.findById(userId).catch(throwNotFoundError);
  assertUserIsAdminOrAcceptedOwner(user, userId);
  // items
  const items = await Promise.all(props.items.map(Item.findById)).catch(
    throwNotFoundError,
  );
  // delivery
  const [delivery] = await Delivery.find({
    where: { id: props.delivery },
    relations: { user: true },
  }).catch(throwNotFoundError);
  assertUserIsAdminOrAcceptedOwner(user, delivery.user.uuid);
  // main
  return (
    await requestOrder(items, user, delivery).catch(throwDBError)
  ).toSafeOutput();
};
