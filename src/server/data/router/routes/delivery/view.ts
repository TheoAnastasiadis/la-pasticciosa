import { z } from "zod";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { Delivery } from "../../../../entities/delivery";
import { User } from "../../../../entities/user";
import { deliveryWUser } from "../../../../validators";
import appConfig from "../../../../config/app.config";

const PAGINATION_LIMIT = appConfig.getPaginationLimit();

type DeliveryWUser = Delivery & { user: User };

export const view = procedure
  .meta({ secure: true, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .input(z.object({ page: z.union([z.number(), z.literal("all")]) }).optional())
  .output(z.array(deliveryWUser))
  .query(async ({ ctx: { onBehalf }, input }) => {
    const user = await User.findOneByOrFail({ uuid: onBehalf });

    const pagination =
      typeof input?.page === "number"
        ? { take: PAGINATION_LIMIT, skip: PAGINATION_LIMIT * input.page }
        : {};

    if (user.isAdmin())
      // admins can view all delivery locations
      return (await Delivery.find({
        ...pagination,
        relations: { user: true },
        order: { id: "desc" },
      })) as DeliveryWUser[];
    // simple users can only access their own locations
    else
      return (await Delivery.find({
        where: { user: { uuid: user.uuid } },
        relations: { user: true },
        order: { id: "desc" },
      })) as DeliveryWUser[];
  });
