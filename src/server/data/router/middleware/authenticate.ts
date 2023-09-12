import { TRPCError } from "@trpc/server";
import { middleware } from "../setup";
import { Session } from "../../../entities/session";
import { IsNull, MoreThanOrEqual } from "typeorm";

export default middleware(async ({ ctx, next, meta }) => {
  // all routes MUST have properly defined metadata.
  // if a route hasn't been properly setup,
  // it should not be accesible by the users
  if (typeof meta === "undefined")
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

  if (meta.secure) {
    if (ctx.sessionId == null) throw new TRPCError({ code: "FORBIDDEN" });
    const sessions = await Session.find({
      where: [
        {
          id: ctx.sessionId,
          deletedAt: MoreThanOrEqual(new Date()),
        },
        {
          id: ctx.sessionId,
          deletedAt: IsNull(),
        },
      ], // we handle deletion here
      relations: { user: true },
      withDeleted: true, // so we include all here
    });

    if (sessions.length < 1) throw new TRPCError({ code: "BAD_REQUEST" });
    return await next({ ctx: { ...ctx, session: sessions[0] } });
  } else {
    return await next({
      ctx,
    });
  }
});
