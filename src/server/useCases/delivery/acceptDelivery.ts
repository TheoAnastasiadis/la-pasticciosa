import { type Delivery, DeliveryStatus } from "../../entities/delivery.entity";

export const acceptDelivery: (delivery: Delivery) => Promise<Delivery> = async (
  delivery,
) => {
  delivery.state = DeliveryStatus.ACCEPTED;
  return await delivery.save();
};
