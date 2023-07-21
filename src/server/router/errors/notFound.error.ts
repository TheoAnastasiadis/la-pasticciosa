import { TRPCError } from "@trpc/server";

export const notFoundError = (id?: string) =>
  new TRPCError({
    code: "NOT_FOUND",
    message: `Entity${id ? " with id " + id : ""} could not ne found`,
  });
