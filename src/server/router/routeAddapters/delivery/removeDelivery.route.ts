import { removeDeliveryController } from "../../../controllers/delivery/removeDelivery.controller";
import { z } from "zod";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";

export const removeDeliveryRoute = authenticatedRoute
  .input(z.object({ deliveryId: z.coerce.string(), userId: z.coerce.string() }))
  .mutation(async ({ input, ctx }) => {
    const { deliveryId } = input;
    const { session } = ctx;
    await removeDeliveryController(deliveryId, session.user);
  });
