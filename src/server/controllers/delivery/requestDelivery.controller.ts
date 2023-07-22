import { devilvery } from "../../entities/decoders/delivery.decoder";
import type { z } from "zod";
import type { User } from "../../entities/user.entity";
import { deliveryRepo } from "../../database/repos/delivery.repo";
import { DeliveryStatus } from "../../entities/delivery.entity";
import { requestDelivery } from "../../useCases/delivery/requestDelivery";
import { throwDBError } from "../helpers/throwDBError";

export const deliveryProps = devilvery.omit({
  id: true,
  user: true,
  type: true,
});

export const requestDeliveryController: (
  props: z.infer<typeof deliveryProps>,
  user: User,
) => Promise<void> = async (props, user) => {
  const delivery = deliveryRepo.create({
    ...props,
    state: DeliveryStatus.REQUESTED,
    user,
  });
  await requestDelivery(delivery).catch(throwDBError);
};
