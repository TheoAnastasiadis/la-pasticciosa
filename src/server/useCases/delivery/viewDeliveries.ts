import { Delivery } from "../../entities/delivery.entity";

export const viewDeliveries: () => Promise<Delivery[]> = async () => {
  return await Delivery.find();
};
