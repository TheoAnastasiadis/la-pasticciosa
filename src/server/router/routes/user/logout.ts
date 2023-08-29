import assert from "assert";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { z } from "zod";

export const logout = procedure
  .meta({ secure: true, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .output(z.void())
  .query(async ({ ctx }) => {
    // secure routes must have exatrcted a Session from ctx.sessionId
    const { session } = ctx;
    assert(session);

    // soft delete session and clear cookie
    await session.softRemove();
    ctx.setCookie("sessionId", null);
  });
