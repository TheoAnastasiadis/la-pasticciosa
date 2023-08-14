import { TRPCError } from "@trpc/server";

export const throwDBError: (e: any) => never = (e) => {
  console.error(e);
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message:
      "Your request could not be completed due to an internal sevrer error",
  });
};
