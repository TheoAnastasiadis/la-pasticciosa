import { viewItems } from "../../../useCases/items/viewItems";
import { publicProcedure } from "../../trpc";
import { throwDBError } from "../../helpers/throwDBError";

export const viewItemsRoute = publicProcedure
  .meta({ requiresAuth: true, adminOnly: true })
  .query(async () => await viewItems().catch(throwDBError));
