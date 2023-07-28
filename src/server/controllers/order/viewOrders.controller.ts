import type { Order } from "../../entities/order.entity";
import type { User } from "../../entities/user.entity";
import { viewOrdersByUser } from "../../useCases/order/viewOrdersByUser";

export const viewOrdersController: (user: User) => Promise<Order[]> = async (
  user,
) => await viewOrdersByUser(user);
