import { Order } from "../../entities/order.entity";
import { UserType, type User } from "../../entities/user.entity";

export const viewOrdersByUser: (user: User) => Promise<Order[]> = async (
  user,
) => {
  if (user.type === UserType.ADMIN)
    // admin is shown all orders by descendind creation
    return await Order.find({
      relations: { delivery: true, user: true, items: true },
      order: { createdAt: "DESC" },
    });
  // users are shown only their own orders
  else
    return await Order.find({
      where: { user: { uuid: user.uuid } },
      relations: { delivery: true, user: true, items: true },
      order: { createdAt: "DESC" },
    });
};
