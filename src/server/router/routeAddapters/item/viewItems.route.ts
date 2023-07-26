import { viewItemsController } from "../../../controllers/item/viewItems.controller";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";

export const viewItemsRoute = adminOnlyRoute.query(viewItemsController);
