import { z } from "zod";

export const quantity = z.object({
  id: z.string(),
  item: z.string(),
  value: z.number(),
  order: z.string(),
});
