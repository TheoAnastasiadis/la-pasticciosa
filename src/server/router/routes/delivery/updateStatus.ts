import { throwDBError } from "../../errors/db.error";
import { throwNotFoundError } from "../../errors/notFound.error";
import { Delivery, DeliveryStatus } from "../../../entities/delivery";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { z } from "zod";

export const updateStatus = procedure
  .meta({ secure: true, adminOnly: true })
  .use(authenticate)
  .use(authorize)
  .input(
    z.object({
      deliveryId: z.coerce.string(),
      action: z.union([z.literal("accept"), z.literal("delete")]),
    }),
  )
  .output(z.void())
  .mutation(async ({ input: { deliveryId, action } }) => {
    await Delivery.findOneByOrFail({ id: deliveryId }).catch(
      throwNotFoundError,
    );

    switch (action) {
      case "accept":
        await Delivery.update(
          { id: deliveryId },
          { state: DeliveryStatus.ACCEPTED },
        ).catch(throwDBError);
        break;
      default:
        await Delivery.delete({ id: deliveryId }).catch(throwDBError);
        break;
    }
  });
