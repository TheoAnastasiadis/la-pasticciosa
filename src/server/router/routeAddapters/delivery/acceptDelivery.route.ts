import { acceptDeliveryController } from "../../../controllers/delivery/acceptDelivery.controller";
import { z } from "zod";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";
import { delivery } from "../../../entities/decoders/delivery.decoder";

export const acceptDeliveryRoute = adminOnlyRoute
  .input(z.coerce.string())
  .output(delivery)
  .mutation(async ({ input }) => {
    const id = input;
    return await acceptDeliveryController(id);
  });
