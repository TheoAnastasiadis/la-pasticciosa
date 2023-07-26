import { item } from "../../../entities/decoders/item.decoder";
import { createItemController } from "../../../controllers/item/createItem.controller";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";

export const createItemRoute = adminOnlyRoute
  .input(item.omit({ id: true }))
  .mutation(async ({ input }) => {
    const props = input;
    await createItemController(props);
  });
