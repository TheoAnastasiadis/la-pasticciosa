import type { InsertResult } from "typeorm";
import type { Delivery } from "../../entities/delivery.entity";
import { deliveryRepo } from "../../database/repos/delivery.repo";

export const requestDelivery: (
  delivery: Delivery,
) => Promise<InsertResult> = async (delivery) =>
  await deliveryRepo.insert(delivery);
