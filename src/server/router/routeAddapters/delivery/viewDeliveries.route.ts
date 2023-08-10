import { viewDeliveriesController } from "../../../controllers/delivery/viewDeliveries.controller";
import { delivery } from "../../../entities/decoders/delivery.decoder";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";
import { z } from "zod";

export const viewDeliveriesRoute = adminOnlyRoute
  .output(z.array(delivery))
  .query(async () => {
    return await viewDeliveriesController();
  });
