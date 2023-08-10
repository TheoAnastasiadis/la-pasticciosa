import { type z } from "zod";
import { type delivery } from "../../entities/decoders/delivery.decoder";
import { viewDeliveries } from "../../useCases/delivery/viewDeliveries";
import { throwDBError } from "../errors/db.error";

export const viewDeliveriesController: () => Promise<
  Array<z.infer<typeof delivery>>
> = async () => {
  const deliveries = await viewDeliveries().catch(throwDBError);
  return deliveries.map((d) => d.toSafeOutput());
};
