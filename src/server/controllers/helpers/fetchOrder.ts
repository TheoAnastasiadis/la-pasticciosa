import { orderRepo } from "../../database/repos/order.repo";
import type { Order } from "../../entities/order.entity";
import { throwDBError } from "./throwDBError";

export const fetchOrder: (id: string) => Promise<Order | null> = async (id) =>
  await orderRepo
    .findOneBy({
      id,
    })
    .catch(throwDBError);
