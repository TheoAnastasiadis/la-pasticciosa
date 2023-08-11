import { z } from "zod";

export const user = z.object({
  uuid: z.coerce.string(),
  userName: z.string(),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8).max(20).regex(/^[^$]/), // passwords should not start with `$`
  status: z.union([
    z.literal("requested"),
    z.literal("accepted"),
    z.literal("rejected"),
  ]),
  type: z.union([z.literal("user"), z.literal("admin")]),
  companyName: z.string(),
  companyAddress: z.string(),
  vat: z.string().length(9),
  catalogue: z.array(z.coerce.string()),
});
