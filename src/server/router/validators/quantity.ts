import { z } from "zod";

export const quantityProps = z.object({
  id: z.string(),
  item: z.coerce.string(),
  value: z.number(),
  order: z.string(),
});

export const RequestQuantityProps = quantityProps.omit({
  id: true,
  order: true,
});
