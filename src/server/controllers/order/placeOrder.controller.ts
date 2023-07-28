import { order } from "../../entities/decoders/order.decoder";
import type { z } from "zod";
import type { User } from "../../entities/user.entity";
import { type Order } from "../../entities/order.entity";
import { fetchItem } from "../helpers/fetchItem";
import type { Item } from "../../entities/item.entity";
import { requestOrder } from "../../useCases/order/requestOrder";
import { fetchUser } from "../helpers/fetchUser";
import { assertExists } from "../helpers/assertExists";
import { assertUserIsAsminOrOwner } from "../helpers/userIsAdminOrOwner";
import { deliveryRepo } from "../../database/repos/delivery.repo";
import { type Delivery } from "../../entities/delivery.entity";

export const orderProps = order.omit({
  id: true,
  user: true,
  total: true,
  status: true,
  estimatedDelivery: true,
  createdAt: true,
});

export const placeOrderController: (
  props: z.infer<typeof orderProps>,
  userId: string,
) => Promise<Order> = async (props, userId) => {
  // user
  const user = await fetchUser(userId);
  assertExists<User>(user);
  assertUserIsAsminOrOwner(user, userId);
  const items = (await Promise.all(props.items.map(fetchItem))) as Item[];
  // items
  items.map(assertExists<Item>);
  // delivery
  const delivery = await deliveryRepo.findOneBy({ id: props.delivery });
  assertExists<Delivery>(delivery);
  assertUserIsAsminOrOwner(user, delivery.user.uuid);
  // main
  return await requestOrder(items, user, delivery);
};
