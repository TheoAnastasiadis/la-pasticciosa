import { deliveryRepo } from "../../database/repos/delivery.repo";
import type { Delivery } from "../../entities/delivery.entity";
import { throwDBError } from "./throwDBError";

export const fetchDelivery: (id: string) => Promise<Delivery | null> = async (
  id,
) => await deliveryRepo.findOneBy({ id }).catch(throwDBError);
