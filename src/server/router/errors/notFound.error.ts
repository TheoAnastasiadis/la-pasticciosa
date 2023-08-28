import { TRPCError } from "@trpc/server";

export const throwNotFoundError: () => never = () => {
  throw new TRPCError({
    code: "NOT_FOUND",
    message: `The requested entity could not be found. Please make sure you are requesting the correct id.`,
  });
};
