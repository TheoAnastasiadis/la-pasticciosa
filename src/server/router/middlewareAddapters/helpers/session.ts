import { TRPCError } from "@trpc/server";
import { populateSession } from "../../../middleware/auth/session.auth";
import { middleware } from "../../trpc";

export const requestWSession = middleware(async ({ ctx, next }) => {
  const { sessionId } = ctx;
  if (sessionId == null) throw new TRPCError({ code: "BAD_REQUEST" });
  const session = await populateSession(sessionId);
  if (session == null) throw new TRPCError({ code: "BAD_REQUEST" });
  return await next({
    ctx: {
      ...ctx,
      session,
    },
  });
});
