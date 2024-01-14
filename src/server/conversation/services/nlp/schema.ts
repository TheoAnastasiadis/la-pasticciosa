import { z } from "zod";

export default z.object({
  quantities: z.array(
    z.object({
      itemId: z.coerce.string(),
      value: z.number().int(),
    }),
  ),
  deliveryLocationId: z.coerce.string(),
});
