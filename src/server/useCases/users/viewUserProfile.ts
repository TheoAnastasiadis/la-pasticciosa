import { deliveryRepo } from "../../database/repos/delivery.repo";
import type { Delivery } from "../../entities/delivery.entity";
import type { User } from "../../entities/user.entity";

export const viewUserProfile: (
  user: User,
) => Promise<{ user: User; deliveries: Delivery[] }> = async (user) => {
  const deliveries: Delivery[] = await deliveryRepo.findBy({
    user: { uuid: user.uuid },
  });
  return { user, deliveries };
};
