import { z } from "zod";
import moment from "moment";

export default z.object({
  quantities: z.array(
    z.object({
      itemId: z.string(),
      value: z.number().int(),
    }),
  ),
  deliveryLocationId: z.string(),
  deliveryDate: z
    .string()
    .datetime()
    .transform((arg) => moment(arg).toDate())
    .optional(),
});
