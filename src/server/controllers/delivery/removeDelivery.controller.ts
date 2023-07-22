import type { Delivery } from "../../entities/delivery.entity";
import { removeDelivery } from "../../useCases/delivery/removeDelivery";
import { assertExists } from "../helpers/assertExists";
import { fetchDelivery } from "../helpers/fetchDelivery";

export const removeDeliveryController: (id: string) => Promise<void> = async (
  id,
) => {
  const delivery = await fetchDelivery(id);
  assertExists<Delivery>(delivery);
  await removeDelivery(delivery);
};
