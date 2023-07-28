import { deliveryRepo } from "../../database/repos/delivery.repo";
import type { Delivery } from "../../entities/delivery.entity";
import { throwDBError } from "./throwDBError";

export const fetchDelivery: (id: string) => Promise<Delivery | null> = async (
  id,
) => {
  const delivery = await deliveryRepo.findOne({
    where: { id },
    relations: { user: true },
  });
  if (delivery === null) throwDBError();
  return delivery;
};
