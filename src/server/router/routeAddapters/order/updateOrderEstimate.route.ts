import { updateOrderEstimateController } from "../../../controllers/order/updateOrderEstimate.controller";
import { publicProcedure } from "../../trpc";
import { z } from "zod";

export const updateOrderEstimateRoute = publicProcedure
  .input(
    z.object({
      id: z.string(),
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
  )
  .meta({ requiresAuth: true, adminOnly: true })
  .mutation(async ({ input }) => {
    const { id, day, month, year } = input;
    return await updateOrderEstimateController(id, year, month, day);
  });
