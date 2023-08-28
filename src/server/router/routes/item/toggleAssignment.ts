import assert from "assert";
import { throwNotFoundError } from "../../errors/notFound.error";
import { Item } from "../../../entities/item";
import { User } from "../../../entities/user";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { z } from "zod";

export const toggleAssignment = procedure
  .meta({ secure: true, adminOnly: true })
  .use(authenticate)
  .use(authorize)
  .input(z.object({ userId: z.coerce.string(), itemId: z.coerce.string() }))
  .output(z.void())
  .mutation(async ({ input: { userId, itemId } }) => {
    const user = await User.findOneOrFail({
      where: { uuid: userId },
      relations: { catalogue: true },
    }).catch(throwNotFoundError);
    assert(user.catalogue);

    const item = await Item.findOneByOrFail({ id: itemId }).catch(
      throwNotFoundError,
    );

    // if Item is assigned then it will be unassigned and vice versa
    if (
      user.catalogue.findIndex(
        (catalogueItem) => catalogueItem.id === item.id,
      ) >= 0
    )
      await user.unassignItem(item);
    else await user.assignItem(item);
  });
