import { acceptDeliveryController } from "../../../controllers/delivery/acceptDelivery.controller";
import { z } from "zod";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";

export const acceptDeliveryRoute = adminOnlyRoute
  .input(z.string())
  .mutation(async ({ input, ctx }) => {
    const id = input;
    return await acceptDeliveryController(id);
  });
