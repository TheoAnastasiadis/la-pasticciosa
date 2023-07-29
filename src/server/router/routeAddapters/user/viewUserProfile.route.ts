import { z } from "zod";
import { viewUserProfileController } from "../../../controllers/user/viewUserProfile.controller";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";
import { delivery } from "../../../entities/decoders/delivery.decoder";
import { user } from "../../../entities/decoders/user.decoder";

export const viewUserProfileRoute = authenticatedRoute
  .input(z.coerce.string().optional())
  .output(z.object({ user, deliveries: z.array(delivery) }))
  .query(async ({ input, ctx }) => {
    const uuid = input ?? ctx.session.user.uuid;
    const { user } = ctx.session;
    return await viewUserProfileController(uuid, user);
  });
