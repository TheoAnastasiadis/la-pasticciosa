import { viewDeliveries } from "../../useCases/delivery/viewDeliveries";
import { throwDBError } from "../errors/db.error";

export const viewDeliveriesController: () => Promise<any[]> = async () => {
  return await viewDeliveries().catch(throwDBError);
};
