import { TRPCError } from "@trpc/server";
import { viewItems } from "../../../useCases/items/viewItems";
import { publicProcedure } from "../../trpc";
import { throwDBError } from "../../helpers/throwDBError";

export const viewItemsRoute = publicProcedure
  .meta({ requiresAuth: true, adminOnly: true })
  .query(() => viewItems().catch(throwDBError));
