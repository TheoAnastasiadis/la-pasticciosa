import { acceptDeliveryController } from "../../../controllers/delivery/acceptDelivery.controller";
import { publicProcedure } from "../../trpc";
import { z } from "zod";

export const acceptDeliveryRoute = publicProcedure
  .input(z.string())
  .meta({ requiresAuth: true, adminOnly: false })
  .mutation(async ({ input }) => {
    const id = input;
    return await acceptDeliveryController(id);
  });
