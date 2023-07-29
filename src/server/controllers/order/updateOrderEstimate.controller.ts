import moment from "moment";
import { Order } from "../../entities/order.entity";
import { updateOrderEstimate } from "../../useCases/order/updateOrderEstimate";
import type { z } from "zod";
import type { order } from "../../entities/decoders/order.decoder";

export const updateOrderEstimateController: (
  id: string,
  year: number,
  monthIdx: number,
  day: number,
) => Promise<z.infer<typeof order>> = async (id, year, monthIdx, day) => {
  const order = await Order.findById(id);
  const timestamp = moment([year, monthIdx, day]).toDate();
  return (await updateOrderEstimate(order, timestamp)).toSafeOutput();
};
