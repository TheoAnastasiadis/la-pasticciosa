import { z } from "zod";
import { order } from "./order.decoder";

export const item = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  image: z.string().url(),
  thumbnail: z.string().url(),
  presentInOrders: z.array(order),
});
