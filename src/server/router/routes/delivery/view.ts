import { z } from "zod";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { throwNotFoundError } from "../../errors/notFound.error";
import { Delivery } from "../../../entities/delivery";
import { User } from "../../../entities/user";
import { deliveryWNoUser } from "../../validators";
import appConfig from "../../../config/app.config";

const PAGINATION_LIMIT = appConfig.getPaginationLimit();

export const view = procedure
  .meta({ secure: true, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .input(z.object({ page: z.number().optional() }))
  .output(z.array(deliveryWNoUser))
  .query(async ({ ctx: { onBehalf }, input: { page } }) => {
    const user = await User.findOneByOrFail({ uuid: onBehalf }).catch(
      throwNotFoundError,
    );

    if (user.isAdmin())
      // admins can view all delivery locations
      return await Delivery.find({
        take: PAGINATION_LIMIT,
        skip: PAGINATION_LIMIT * (page ?? 0),
      });
    // simple users can only access their own locations
    else
      return await Delivery.find({
        where: { user: { uuid: user.uuid } },
        relations: { user: true },
      });
  });
