import { logOutController } from "../../../controllers/user/logout.controller";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";
import { z } from "zod";

export const logOutRoute = authenticatedRoute
  .output(z.void())
  .query(async ({ ctx }) => {
    const { session } = ctx;
    await logOutController(session);
    ctx.setCookie("sessionId", null);
  });
