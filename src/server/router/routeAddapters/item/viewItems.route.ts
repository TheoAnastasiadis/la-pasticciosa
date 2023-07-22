import { publicProcedure } from "../../trpc";
import { viewItemsController } from "../../../controllers/item/viewItems.controller";

export const viewItemsRoute = publicProcedure
  .meta({ requiresAuth: true, adminOnly: true })
  .query(viewItemsController);
