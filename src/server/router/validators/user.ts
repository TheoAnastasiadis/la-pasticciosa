import { z } from "zod";

export const userStatusParser = z.union([
  z.literal("requested"),
  z.literal("accepted"),
  z.literal("rejected"),
]);

export const userPasswordParser = z.string().min(8).max(20).regex(/^[^$]/); // passwords should not start with `$`

export const userProps = z.object({
  uuid: z.coerce.string(),
  userName: z.string(),
  email: z.string().email().toLowerCase(),
  password: userPasswordParser,
  status: userStatusParser,
  type: z.union([z.literal("user"), z.literal("admin")]),
  companyName: z.string(),
  companyAddress: z.string(),
  vat: z.string().length(9),
  catalogue: z.array(z.coerce.string()),
});

export const requestUserProps = userProps.omit({
  uuid: true,
  type: true,
  status: true,
  catalogue: true,
});

export const userWNoPassword = userProps.omit({ password: true });

export const userWNoPasswordOrCatalogue = userWNoPassword.omit({
  catalogue: true,
});
