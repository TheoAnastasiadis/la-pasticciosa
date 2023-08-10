import { deleteItemController } from "../../../controllers/item/deleteItem.controller";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";
import { z } from "zod";

export const deleteItemRoute = adminOnlyRoute
  .input(z.string())
  .mutation(async ({ input }) => {
    const itemId = input;
    await deleteItemController(itemId);
  });
