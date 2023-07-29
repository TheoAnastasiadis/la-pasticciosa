import type { delivery } from "../../entities/decoders/delivery.decoder";
import type { z } from "zod";
import type { User } from "../../entities/user.entity";
import {
  type deliveryProps,
  requestDelivery,
} from "../../useCases/delivery/requestDelivery";
import { throwDBError } from "../errors/db.error";

export const requestDeliveryController: (
  props: z.infer<typeof deliveryProps>,
  user: User,
) => Promise<z.infer<typeof delivery>> = async (props, user) => {
  return (
    await requestDelivery(props, user).catch(throwDBError)
  ).toSafeOutput();
};
