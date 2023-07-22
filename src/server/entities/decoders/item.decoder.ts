import { z } from "zod";

export const item = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string().url(),
  thumbnail: z.string().url(),
})
