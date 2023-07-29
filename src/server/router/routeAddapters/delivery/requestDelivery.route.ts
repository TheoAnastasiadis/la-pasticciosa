import { requestDeliveryController } from "../../../controllers/delivery/requestDelivery.controller";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";
import { delivery } from "../../../entities/decoders/delivery.decoder";
import { deliveryProps } from "../../../useCases/delivery/requestDelivery";

export const requestDeliveryRoute = authenticatedRoute
  .input(deliveryProps)
  .output(delivery)
  .mutation(async ({ input, ctx }) => {
    const props = input;
    const { user } = ctx.session;
    return await requestDeliveryController(props, user);
  });
