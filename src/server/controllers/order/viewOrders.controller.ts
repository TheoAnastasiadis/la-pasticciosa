import type { order } from "../../entities/decoders/order.decoder";
import type { User } from "../../entities/user.entity";
import { viewOrdersByUser } from "../../useCases/order/viewOrdersByUser";
import { throwDBError } from "../errors/db.error";
import type { z } from "zod";

export const viewOrdersController: (
  user: User,
) => Promise<Array<z.infer<typeof order>>> = async (user) =>
  (
    await viewOrdersByUser(user)
      .then((orders) => {
        console.log(JSON.stringify(orders, undefined, 2));
        return orders;
      })
      .catch(throwDBError)
  ).map((order) => order.toSafeOutput());
