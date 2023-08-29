import { z } from "zod";
import { userWNoPasswordOrCatalogue } from "./user";

export const deliveryState = z.union([
  z.literal("requested"),
  z.literal("accepted"),
]);

export const deliveryProps = z.object({
  id: z.coerce.string(),
  street: z.string(),
  number: z.string(),
  zip: z.string().length(5),
  name: z.string(),
  details: z.coerce.string().optional(),
  user: z.coerce.string(),
  state: deliveryState,
});

export const requestDeliveryProps = deliveryProps.omit({
  id: true,
  user: true,
  state: true,
});

export const deliveryWUser = deliveryProps
  .omit({ user: true })
  .merge(z.object({ user: userWNoPasswordOrCatalogue }));

export const deliveryWNoUser = deliveryProps.omit({ user: true });
