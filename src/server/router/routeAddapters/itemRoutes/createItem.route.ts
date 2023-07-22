import { item } from "../../../entities/decoders/item.decoder";
import { Item } from "../../../entities/item.entity";
import { createItem } from "../../../useCases/items/createItem";
import { publicProcedure } from "../../trpc";
import { throwDBError } from "../../helpers/throwDBError";

export const createItemRoute = publicProcedure
  .input(item.omit({ id: true }))
  .meta({ requiresAuth: true, adminOnly: true })
  .mutation(async ({ input }) => {
    const item = new Item();
    Object.assign(item, input);

    return await createItem(item).catch(throwDBError);
  });
