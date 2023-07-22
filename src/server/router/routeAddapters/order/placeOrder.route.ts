import {
  orderProps,
  placeOrderController,
} from "../../../controllers/order/placeOrder.controller";
import { publicProcedure } from "../../trpc";

export const placeOrderRoute = publicProcedure
  .input(orderProps)
  .meta({ requiresAuth: true, adminOnly: false })
  .mutation(async ({ input, ctx }) => {
    const props = input;
    const { user } = ctx;
    return await placeOrderController(props, user);
  });
