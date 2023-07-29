import { Delivery } from "../../entities/delivery.entity";
import { removeDelivery } from "../../useCases/delivery/removeDelivery";
import type { User } from "../../entities/user.entity";
import { assertUserIsAdminOrAcceptedOwner } from "../helpers/userIsAdminOrOwner";

export const removeDeliveryController: (
  deliveryId: string,
  user: User,
) => Promise<void> = async (deliveryId, user) => {
  const delivery = await Delivery.findById(deliveryId);
  assertUserIsAdminOrAcceptedOwner(user, delivery.user.uuid);
  await removeDelivery(delivery);
};
