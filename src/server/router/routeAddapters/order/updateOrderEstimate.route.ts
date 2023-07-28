import { updateOrderEstimateController } from "../../../controllers/order/updateOrderEstimate.controller";
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
  .mutation(async ({ input }) => {
    const { id, day, month, year } = input;
    return await updateOrderEstimateController(id, year, month, day);
  });
