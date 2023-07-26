import { assertUserIsAdmin } from "../../middleware/auth/admin.auth";
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
    assertUserIsAdmin(user);
    return await next({ ctx });
  });
