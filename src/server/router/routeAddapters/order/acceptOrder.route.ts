import { acceptOrderController } from "../../../controllers/order/acceptOrder.controller";
import { publicProcedure } from "../../trpc";
import { z } from "zod";

export const acceptOrderRoute = publicProcedure
  .input(z.string())
  .meta({ requiresAuth: true, adminOnly: false })
  .mutation(async ({ input }) => {
    const id = input;
    return await acceptOrderController(id);
  });
