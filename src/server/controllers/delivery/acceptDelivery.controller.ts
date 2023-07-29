import { Delivery } from "../../entities/delivery.entity";
import { acceptDelivery } from "../../useCases/delivery/acceptDelivery";
import { throwDBError } from "../errors/db.error";
import type { z } from "zod";
import { type delivery } from "../../entities/decoders/delivery.decoder";
import { throwNotFoundError } from "../errors/notFound.error";

export const acceptDeliveryController: (
  id: string,
) => Promise<z.infer<typeof delivery>> = async (id) => {
  const delivery = await Delivery.findById(id).catch(throwNotFoundError);
  return (await acceptDelivery(delivery).catch(throwDBError)).toSafeOutput();
};
