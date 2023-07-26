import { orderRepo } from "../../database/repos/order.repo";
import type { Order } from "../../entities/order.entity";
import { UserType, type User } from "../../entities/user.entity";

export const viewOrdersByUser: (user: User) => Promise<Order[]> = async (
  user,
) => {
  let qb = orderRepo
    .createQueryBuilder("order")
    .leftJoinAndSelect("order.user", "user");
  if (user.type !== UserType.ADMIN)
    qb = qb.where("user.uuid = :uuid", { uuid: user.uuid });
  return await qb.execute();
};
