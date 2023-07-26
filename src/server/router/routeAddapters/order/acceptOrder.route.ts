import { acceptOrderController } from "../../../controllers/order/acceptOrder.controller";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";
import { z } from "zod";

export const acceptOrderRoute = adminOnlyRoute
  .input(z.string())
  .mutation(async ({ input }) => {
    const id = input;
    return await acceptOrderController(id);
  });
