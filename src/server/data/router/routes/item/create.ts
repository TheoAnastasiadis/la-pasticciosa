import { Item } from "../../../../entities/item";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { createItemProps, itemProps } from "../../../../validators";

export const create = procedure
  .meta({ secure: true, adminOnly: true })
  .use(authenticate)
  .use(authorize)
  .input(createItemProps)
  .output(itemProps)
  .mutation(async ({ input }) => {
    return await Item.create({ ...input }).save();
  });
