import { throwNotFoundError } from "../../errors/notFound.error";
import { Item } from "../../../entities/item";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { z } from "zod";

export const deleteItem = procedure
  .meta({ secure: true, adminOnly: true })
  .use(authenticate)
  .use(authorize)
  .input(z.object({ itemId: z.coerce.string() }))
  .output(z.void())
  .mutation(async ({ input: { itemId } }) => {
    const item = await Item.findOneByOrFail({ id: itemId }).catch(
      throwNotFoundError,
    );
    await item.softRemove();
  });
