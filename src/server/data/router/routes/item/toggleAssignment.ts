import { Item } from "../../../../entities/item";
import { User } from "../../../../entities/user";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { z } from "zod";

const catalogueContainsItem: (
  catalogue: User["catalogue"],
  itemId: string,
) => boolean = (catalogue, itemId) => {
  const set = new Set(catalogue?.map((item) => item.id));
  return set.has(itemId);
};

export const toggleAssignment = procedure
  .meta({ secure: true, adminOnly: true })
  .use(authenticate)
  .use(authorize)
  .input(z.object({ userId: z.coerce.string(), itemId: z.coerce.string() }))
  .output(z.void())
  .mutation(async ({ input: { userId, itemId } }) => {
    const [user, item] = await Promise.all([
      User.findOneOrFail({
        where: { uuid: userId },
        relations: { catalogue: true },
      }),
      Item.findOneByOrFail({ id: itemId }),
    ]);

    // if Item is assigned then it will be unassigned and vice versa
    if (catalogueContainsItem(user.catalogue, item.id))
      await user.unassignItem(item);
    else await user.assignItem(item);
  });
