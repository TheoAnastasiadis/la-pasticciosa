import { z } from "zod";

export const order = z.object({
  id: z.coerce.string(),
  user: z.coerce.string(),
  delivery: z.coerce.string(),
  quantities: z.array(
    z.object({ item: z.coerce.string(), value: z.coerce.number() }),
  ),
  total: z.coerce.string(),
  status: z.union([
    z.literal("pending"),
    z.literal("accepted"),
    z.literal("in_preparation"),
    z.literal("complete"),
  ]),
  estimatedDelivery: z.union([z.coerce.date(), z.null()]),
  createdAt: z.date(),
});
