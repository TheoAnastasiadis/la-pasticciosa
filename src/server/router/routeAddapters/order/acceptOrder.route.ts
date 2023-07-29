import { acceptOrderController } from "../../../controllers/order/acceptOrder.controller";
import { order } from "../../../entities/decoders/order.decoder";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";
import { z } from "zod";

export const acceptOrderRoute = adminOnlyRoute
  .input(z.coerce.string())
  .output(order)
  .mutation(async ({ input }) => {
    const id = input;
    return await acceptOrderController(id);
  });
