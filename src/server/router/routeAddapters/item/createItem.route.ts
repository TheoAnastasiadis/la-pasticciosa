import { item } from "../../../entities/decoders/item.decoder";
import { createItemController } from "../../../controllers/item/createItem.controller";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";

export const createItemRoute = adminOnlyRoute
  .input(item.omit({ id: true }))
  .output(item)
  .mutation(async ({ input }) => {
    const props = input;
    return await createItemController(props);
  });
