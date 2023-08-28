import { z } from "zod";

export const quantityProps = z.object({
  id: z.string(),
  item: z.string(),
  value: z.number(),
  order: z.string(),
});

export const RequestQuantityProps = quantityProps.omit({
  id: true,
  order: true,
});
