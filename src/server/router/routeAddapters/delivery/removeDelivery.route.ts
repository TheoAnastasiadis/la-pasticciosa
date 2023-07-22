import { removeDeliveryController } from "../../../controllers/delivery/removeDelivery.controller";
import { publicProcedure } from "../../trpc";
import { z } from "zod";

export const removeDeliveryRoute = publicProcedure
  .input(z.string())
  .meta({ requiresAuth: true, adminOnly: false })
  .mutation(async ({ input }) => {
    const id = input;
    await removeDeliveryController(id);
  });
