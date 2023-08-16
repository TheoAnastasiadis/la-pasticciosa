import { viewDeliveriesController } from "../../../controllers/delivery/viewDeliveries.controller";
import { delivery } from "../../../entities/decoders/delivery.decoder";
import { user } from "../../../entities/decoders/user.decoder";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";
import { z } from "zod";

export const viewDeliveriesRoute = adminOnlyRoute
  .output(
    z.array(
      delivery
        .omit({ user: true })
        .merge(
          z.object({ user: user.omit({ password: true, catalogue: true }) }),
        ),
    ),
  )
  .query(async () => {
    return await viewDeliveriesController();
  });
