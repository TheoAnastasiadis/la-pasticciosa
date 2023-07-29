import { TRPCError } from "@trpc/server";

export const throwDBError: () => never = () => {
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message:
      "Your request could not be completed due to an internal sevrer error",
  });
};
