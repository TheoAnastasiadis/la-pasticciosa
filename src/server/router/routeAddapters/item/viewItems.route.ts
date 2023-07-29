import { viewItemsController } from "../../../controllers/item/viewItems.controller";
import { item } from "../../../entities/decoders/item.decoder";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";
import { z } from "zod";

export const viewItemsRoute = adminOnlyRoute
  .output(z.array(item))
  .query(viewItemsController);
