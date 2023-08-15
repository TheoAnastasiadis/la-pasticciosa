import type { User } from "../../entities/user.entity";
import { viewOrdersByUser } from "../../useCases/order/viewOrdersByUser";
import { throwDBError } from "../errors/db.error";

export const viewOrdersController: (user: User) => Promise<any> = async (
  user,
) =>
  await viewOrdersByUser(user)
    .then((orders) => {
      console.log(JSON.stringify(orders, undefined, 2));
      return orders;
    })
    .catch(throwDBError);
