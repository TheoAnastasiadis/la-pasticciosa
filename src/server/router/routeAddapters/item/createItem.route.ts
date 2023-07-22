import { item } from "../../../entities/decoders/item.decoder";
import { publicProcedure } from "../../trpc";
import { createItemController } from "../../../controllers/item/createItem.controller";

export const createItemRoute = publicProcedure
  .input(item.omit({ id: true }))
  .meta({ requiresAuth: true, adminOnly: true })
  .mutation(async ({ input }) => {
    const props = input;
    await createItemController(props);
  });
