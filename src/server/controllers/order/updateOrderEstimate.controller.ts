import moment from "moment";
import type { Order } from "../../entities/order.entity";
import { assertExists } from "../helpers/assertExists";
import { fetchOrder } from "../helpers/fetchOrder";
import { updateOrderEstimate } from "../../useCases/order/updateOrderEstimate";

export const updateOrderEstimateController: (
  id: string,
  year: number,
  monthIdx: number,
  day: number,
) => Promise<Order> = async (id, year, monthIdx, day) => {
  const order = await fetchOrder(id);
  assertExists<Order>(order);
  const timestamp = moment([year, monthIdx, day]).toDate();
  return await updateOrderEstimate(order, timestamp);
};
