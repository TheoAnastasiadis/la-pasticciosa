import { z } from "zod";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { User } from "../../../../entities/user";
import { Item } from "../../../../entities/item";
import { In } from "typeorm";
import { itemProps } from "../../validators";
import appConfig from "../../../../config/app.config";

const PAGINATION_LIMIT = appConfig.getPaginationLimit();

export const view = procedure
  .meta({ secure: true, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .input(z.object({ page: z.union([z.number(), z.literal("all")]) }).optional())
  .output(z.array(itemProps))
  .query(async ({ ctx: { onBehalf }, input }) => {
    const user = await User.findOneOrFail({
      where: { uuid: onBehalf },
      relations: { catalogue: true },
    });

    const pagination =
      typeof input?.page === "number"
        ? { take: PAGINATION_LIMIT, skip: PAGINATION_LIMIT * input.page }
        : {};

    if (user.isAdmin()) {
      // Admins can view all items
      return await Item.find({
        ...pagination,
        order: { id: "DESC" },
      });
    }

    if (Array.isArray(user.catalogue) && user.catalogue.length > 0)
      return await Item.find({
        // Simple users can only access their assignedItems
        where: { id: In(user.catalogue.map((item) => item.id)) },
      });
    else return await Promise.resolve([]);
  });
