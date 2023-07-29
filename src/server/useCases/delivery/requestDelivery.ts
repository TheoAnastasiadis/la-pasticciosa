import { DeliveryStatus, Delivery } from "../../entities/delivery.entity";
import { delivery } from "../../entities/decoders/delivery.decoder";
import type { z } from "zod";
import type { User } from "../../entities/user.entity";

export const deliveryProps = delivery.omit({
  id: true,
  user: true,
  state: true,
});

export const requestDelivery: (
  props: z.infer<typeof deliveryProps>,
  user: User,
) => Promise<Delivery> = async (props, user) =>
  await Delivery.createAndSave(
    { ...props, state: DeliveryStatus.REQUESTED },
    user,
  );
