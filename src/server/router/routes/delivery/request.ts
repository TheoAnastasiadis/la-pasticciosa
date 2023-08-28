import { throwNotFoundError } from "../../errors/notFound.error";
import { Delivery, DeliveryStatus } from "../../../entities/delivery";
import { User } from "../../../entities/user";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { deliveryWNoUser, requestDeliveryProps } from "../../validators";

export const request = procedure
  .meta({ secure: true, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .input(requestDeliveryProps)
  .output(deliveryWNoUser)
  .mutation(async ({ ctx, input }) => {
    const user = await User.findOneByOrFail({ uuid: ctx.onBehalf }).catch(
      throwNotFoundError,
    );

    const delivery = Delivery.create({ ...input });
    delivery.state = DeliveryStatus.REQUESTED;
    delivery.user = user;
    return await delivery.save();
  });
