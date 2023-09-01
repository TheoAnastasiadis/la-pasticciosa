import { TRPCError } from "@trpc/server";
import assert from "assert";
import { type Delivery, DeliveryStatus } from "../entities/delivery";
import { type Item } from "../entities/item";
import { type User, UserStatus } from "../entities/user";

export default {
  validate: (
    user: User,
    quantities: Array<{ item: string; value: number }>,
    delivery: Delivery,
  ) => {
    // Validate Users
    if (user.status !== UserStatus.ACCEPTED)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message:
          "This user has not been accepted by the administrators. Only accepted users can place orders.",
      });

    // Validate Delivery
    assert(delivery.user);
    if (
      delivery.user.uuid !== user.uuid ||
      delivery.state !== DeliveryStatus.ACCEPTED
    )
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message:
          "The requested delivery location has not been accepted for this user.",
      });

    // validate items
    if (quantities.length <= 0)
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: "Orders must contain at least on item.",
      });

    const itemsAreAssigned = quantities.every(
      ({ item }) => user?.catalogue?.map((i) => i.id.toString()).includes(item),
    );

    if (!itemsAreAssigned)
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: "The requested items are not assigned for this user.",
      });
  },
  calculateTotal: (quantities: Array<{ item: Item; value: number }>) => {
    // Calculate order total as item.price * quantity.value
    return quantities
      .map(
        ({ item, value }) =>
          parseFloat(item.price) * parseInt(value.toString()),
      )
      .reduce((total, addition) => total + addition)
      .toFixed(2);
  },
};
