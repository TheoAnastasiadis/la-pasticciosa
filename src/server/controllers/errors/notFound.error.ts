import { TRPCError } from "@trpc/server";

export const notFoundError: (id?: string) => TRPCError = (id) =>
  new TRPCError({
    code: "NOT_FOUND",
    message: `Entity${
      id !== undefined ? " with id " + id : ""
    } could not ne found`,
  });
