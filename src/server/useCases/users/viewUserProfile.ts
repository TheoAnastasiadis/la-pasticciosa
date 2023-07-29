import { Delivery } from "../../entities/delivery.entity";
import type { User } from "../../entities/user.entity";

export const viewUserProfile: (
  user: User,
) => Promise<{ user: User; deliveries: Delivery[] }> = async (user) => {
  const deliveries: Delivery[] = await Delivery.find({
    where: { user: { uuid: user.uuid } },
    relations: { user: true },
  });
  return { user, deliveries };
};
