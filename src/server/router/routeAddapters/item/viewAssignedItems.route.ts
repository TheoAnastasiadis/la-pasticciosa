import { z } from "zod";
import { viewAssignedItemsController } from "../../../controllers/item/viewAssignedItems.controller";
import { authenticatedRoute } from "../../middlewareAddapters/authenticatedRequest";
import { item } from "../../../entities/decoders/item.decoder";

export const viewAssignedItemsRoute = authenticatedRoute
  .input(z.string().optional())
  .output(z.array(item))
  .query(async ({ input, ctx }) => {
    const userId = input ?? ctx.session.user.uuid;
    const { user } = ctx.session;
    return await viewAssignedItemsController(user, userId);
  });
