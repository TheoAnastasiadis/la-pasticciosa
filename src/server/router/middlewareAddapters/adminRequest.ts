import { publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { requestWSession } from "./helpers/session";

export const adminOnlyRoute = publicProcedure
  .use(requestWSession)
  .use(async ({ ctx, next }) => {
    const { session } = ctx;
    if (typeof session === "undefined")
      throw new TRPCError({ code: "BAD_REQUEST" });
    const { user } = session;
    if (!user.isAdmin()) throw new TRPCError({ code: "METHOD_NOT_SUPPORTED" });
    return await next({ ctx });
  });
