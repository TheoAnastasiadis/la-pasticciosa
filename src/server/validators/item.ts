import { z } from "zod";

export const itemProps = z.object({
  id: z.coerce.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  unit: z.string(),
  image: z.string().url(),
  thumbnail: z.string().url(),
});

export const createItemProps = itemProps.omit({ id: true });
