import { Delivery } from "../../entities/delivery";
import type { z } from "zod";
import type { User } from "../../entities/user";
import type { requestDeliveryProps } from "../../router/validators";

export default async function createAndSave(
  props: z.infer<typeof requestDeliveryProps>,
  user: User,
): Promise<Delivery> {
  const delivery = Delivery.create(props as Delivery);
  await delivery.save();
  delivery.user = user;
  return await delivery.save();
}
