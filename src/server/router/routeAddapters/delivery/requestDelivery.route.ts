import {
  deliveryProps,
  requestDeliveryController,
} from "../../../controllers/delivery/requestDelivery.controller";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";

export const requestDeliveryRoute = authenticatedRoute
  .input(deliveryProps)
  .mutation(async ({ input, ctx }) => {
    const props = input;
    const { user } = ctx.session;
    await requestDeliveryController(props, user);
  });
