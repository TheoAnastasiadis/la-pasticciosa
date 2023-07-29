import { TRPCError } from "@trpc/server";

export const throwNotFoundError: (id?: string) => never = (id) => {
  throw new TRPCError({
    code: "NOT_FOUND",
    message: `Entity${
      id !== undefined ? " with id " + id : ""
    } could not ne found`,
  });
};
