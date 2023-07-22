import type { Order } from "../../entities/order.entity";
import type { User } from "../../entities/user.entity";
import { viewOrdersByUser } from "../../useCases/order/viewOrdersByUser";
import { assertExists } from "../helpers/assertExists";
import { fetchUser } from "../helpers/fetchUser";

export const viewOrdersController: (
  userId: string,
) => Promise<Order[]> = async (userId) => {
  const user = await fetchUser(userId);
  assertExists<User>(user);
  return await viewOrdersByUser(user);
};
