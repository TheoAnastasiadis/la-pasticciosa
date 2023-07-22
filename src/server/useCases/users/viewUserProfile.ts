import { deliveryRepo } from "../../database/repos/delivery.repo";
import type { Delivery } from "../../entities/delivery.entity";
import type { User } from "../../entities/user.entity";

export const viewUserProfile: (
  user: User,
) => Promise<{ user: User; deliveries: Delivery[] }> = async (user) => {
  const deliveries: Delivery[] = await deliveryRepo
    .createQueryBuilder("delivery")
    .leftJoinAndSelect("delivery.user", "user")
    .where("user.uuid = :uuid", { uuid: user.uuid })
    .execute();
  user.password = "";
  return {
    user,
    deliveries,
  };
};
