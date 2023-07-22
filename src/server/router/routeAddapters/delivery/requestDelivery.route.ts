import {
  deliveryProps,
  requestDeliveryController,
} from "../../../controllers/delivery/requestDelivery.controller";
import { publicProcedure } from "../../trpc";

export const requestDeliveryRoute = publicProcedure
  .input(deliveryProps)
  .meta({ requiresAuth: true, adminOnly: false })
  .mutation(async ({ input, ctx }) => {
    const props = input;
    const { user } = ctx;
    await requestDeliveryController(props, user);
  });
