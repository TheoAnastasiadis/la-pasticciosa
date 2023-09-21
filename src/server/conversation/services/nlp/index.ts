import assert from "assert";
import { Delivery, DeliveryStatus } from "../../../entities/delivery";
import { User } from "../../../entities/user";
import ai from "./generate";
import OrderService from "../order";

export default async function parseOrder(
  mobileNumber: string,
  message: string,
): Promise<string | false> {
  // find the user that sent the message
  const [user, deliveries] = await Promise.all([
    User.findOne({
      where: { mobileNumber },
      relations: { catalogue: true },
    }),
    Delivery.find({
      where: { user: { mobileNumber }, state: DeliveryStatus.ACCEPTED },
    }),
  ]);
  assert(user);
  assert(user.catalogue);

  // create prompt and generate the ai response
  const prompt = ai.createPrompt(user, user.catalogue, deliveries);
  const response = await ai.generateResponse(prompt, message);
  const data = ai.parseResponse(response);
  // handle empty response
  if (data === false) return false;

  // place order from generated data
  const connection = await OrderService.authenticate();
  const orderId = await connection.placeOrder(data, user);
  if (typeof data.deliveryDate !== "undefined")
    await connection
      .updateOrderEstimate(orderId, data.deliveryDate)
      .catch(() => {
        console.error(
          "order was placed, but date was not succesfully altered.",
        );
      });
  return orderId;
}
