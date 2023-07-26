import type { Delivery } from "../../entities/delivery.entity";
import { deliveryRepo } from "../../database/repos/delivery.repo";

export const requestDelivery: (
  delivery: Delivery,
) => Promise<Delivery> = async (delivery) => {
  const id = (await deliveryRepo.insert(delivery)).generatedMaps[0].id;
  delivery.id = id;
  return delivery;
};
