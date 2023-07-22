import { orderRepo } from "../../database/repos/order.repo";
import type { Order } from "../../entities/order.entity";
import type { User } from "../../entities/user.entity";

export const viewOrdersByUser: (user: User) => Promise<Order[]> = async (
  user,
) =>
  await orderRepo
    .createQueryBuilder("order")
    .leftJoinAndSelect("order.user", "user")
    .where("user.uuid = :uuid", { uuid: user.uuid })
    .execute();
