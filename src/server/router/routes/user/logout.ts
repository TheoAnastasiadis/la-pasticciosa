import { Session } from "../../../entities/session";
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
    const session = await Session.findOneByOrFail({
      id: ctx.sessionId as string,
    });
    await session.softRemove();
    ctx.setCookie("sessionId", null);
  });
