import { z } from "zod";

export const item = z.object({
  id: z.coerce.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  image: z.string().url(),
  thumbnail: z.string().url(),
});
