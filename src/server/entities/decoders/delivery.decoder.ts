import { z } from "zod";

export const delivery = z.object({
  id: z.coerce.string(),
  street: z.string(),
  number: z.string(),
  zip: z.string().length(5),
  name: z.string(),
  details: z.optional(z.string()),
  user: z.coerce.string(),
  state: z.union([z.literal("requested"), z.literal("accepted")]),
});
