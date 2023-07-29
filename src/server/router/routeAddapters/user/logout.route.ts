import { logOutController } from "../../../controllers/user/logout.controller";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";

export const logOutRoute = authenticatedRoute.query(async ({ ctx }) => {
  const { session } = ctx;
  await logOutController(session);
  ctx.setCookie("sessionId", null);
});
