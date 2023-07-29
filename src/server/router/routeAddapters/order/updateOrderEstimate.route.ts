import { updateOrderEstimateController } from "../../../controllers/order/updateOrderEstimate.controller";
import { order } from "../../../entities/decoders/order.decoder";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";
import { z } from "zod";

export const updateOrderEstimateRoute = adminOnlyRoute
  .input(
    z.object({
      id: z.coerce.string(),
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
  )
  .output(order)
  .mutation(async ({ input }) => {
    const { id, day, month, year } = input;
    return await updateOrderEstimateController(id, year, month, day);
  });
