import type { Delivery } from "../../entities/delivery.entity";
import { acceptDelivery } from "../../useCases/delivery/acceptDelivery";
import { assertExists } from "../helpers/assertExists";
import { fetchDelivery } from "../helpers/fetchDelivery";
import { throwDBError } from "../helpers/throwDBError";

export const acceptDeliveryController: (
  id: string,
) => Promise<Delivery> = async (id) => {
  const delivery = await fetchDelivery(id);
  assertExists<Delivery>(delivery);
  return await acceptDelivery(delivery).catch(throwDBError);
};
