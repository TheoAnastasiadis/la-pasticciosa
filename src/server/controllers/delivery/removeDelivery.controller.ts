import type { Delivery } from "../../entities/delivery.entity";
import { removeDelivery } from "../../useCases/delivery/removeDelivery";
import { assertExists } from "../helpers/assertExists";
import { fetchDelivery } from "../helpers/fetchDelivery";
import type { User } from "../../entities/user.entity";
import { assertUserIsAsminOrOwner } from "../helpers/userIsAdminOrOwner";

export const removeDeliveryController: (
  deliveryId: string,
  user: User,
) => Promise<void> = async (deliveryId, user) => {
  const delivery = await fetchDelivery(deliveryId);
  assertExists<Delivery>(delivery);
  assertUserIsAsminOrOwner(user, delivery.user.uuid);
  await removeDelivery(delivery);
};
