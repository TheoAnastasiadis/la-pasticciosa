import { z } from "zod";

export const order = z.object({
  id: z.string(),
  user: z.string().uuid(),
  delivery: z.coerce.string(),
  items: z.array(z.coerce.string()),
  total: z.number(),
  status: z.union([
    z.literal("pending"),
    z.literal("accepted"),
    z.literal("in_preparation"),
    z.literal("complete"),
  ]),
  estimatedDelivery: z.optional(z.string().datetime()),
  createdAt: z.date(),
});
