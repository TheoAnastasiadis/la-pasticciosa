import { z } from "zod";
import { viewUserProfileController } from "../../../controllers/user/viewUserProfile.controller";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";

export const viewUserProfileRoute = authenticatedRoute
  .input(z.string().optional())
  .query(async ({ input, ctx }) => {
    const uuid = input ?? ctx.session.user.uuid;
    const { user } = ctx.session;
    return await viewUserProfileController(uuid, user);
  });
