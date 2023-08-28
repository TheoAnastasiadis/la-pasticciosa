import { z } from "zod";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { User } from "../../../entities/user";
import { throwNotFoundError } from "../../errors/notFound.error";
import { Item } from "../../../entities/item";
import { In } from "typeorm";
import assert from "assert";
import { itemProps } from "../../validators";
import appConfig from "../../../config/app.config";

const PAGINATION_LIMIT = appConfig.getPaginationLimit();

export const view = procedure
  .meta({ secure: true, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .input(z.object({ page: z.number().optional() }))
  .output(z.array(itemProps))
  .query(async ({ ctx: { onBehalf }, input: { page } }) => {
    const user = await User.findOneOrFail({
      where: { uuid: onBehalf },
      relations: { catalogue: true },
    }).catch(throwNotFoundError);
    assert(user.catalogue);

    if (user.isAdmin()) {
      // Admins can view all items
      return await Item.find({
        take: PAGINATION_LIMIT,
        skip: PAGINATION_LIMIT * (page ?? 0),
      });
    }

    return await Item.find({
      // Simple users can only access their assignedItems
      where: { id: In(user.catalogue.map((item) => item.id)) },
    });
  });
