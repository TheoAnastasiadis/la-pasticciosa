import { z } from "zod";

export const devilvery = z.object({
  id: z.string(),
  street: z.string(),
  number: z.string(),
  zip: z.string().length(5).transform(Number),
  name: z.string(),
  details: z.optional(z.string()),
  user: z.string().uuid(),
  sate: z.union([z.literal("requested"), z.literal("accepted")]),
});
