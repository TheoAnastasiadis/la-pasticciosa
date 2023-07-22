import type { Delivery } from "../../entities/delivery.entity";

export const removeDelivery: (delivery: Delivery) => Promise<void> = async (
  delivery,
) => {
  await delivery.remove();
};
