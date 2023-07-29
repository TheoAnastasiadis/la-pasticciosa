import type { TRPCError } from "@trpc/server";
import { AppDataSource } from "../../../../src/server/database/dataSource";
import { OrderStatus } from "../../../../src/server/entities/order.entity";
import { requestOrder } from "../../../../src/server/useCases/order/requestOrder";
import { viewUserProfile } from "../../../../src/server/useCases/users/viewUserProfile";
import { User } from "../../../../src/server/entities/user.entity";
import {
  Delivery,
  DeliveryStatus,
} from "../../../../src/server/entities/delivery.entity";
import { Item } from "../../../../src/server/entities/item.entity";

describe("Request Order", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });
  test("places a new order, when items and delivery are valid", async () => {
    const user = await User.findOneByOrFail({ userName: "Assigned User" });
    const { deliveries } = await viewUserProfile(user);
    const delivery = deliveries.filter(
      (d) => d.state === DeliveryStatus.ACCEPTED,
    )[0];
    delivery.user = user;
    const order = await requestOrder(user.catalogue, user, delivery);
    expect(order.total).toEqual("27.24");
    expect(order.status).toEqual(OrderStatus.PENDING);
  });
  test("throws when delivery is not accepted", async () => {
    const user = await User.findOneByOrFail({ userName: "Assigned User" });
    const delivery = await Delivery.findOneByOrFail({
      name: "Requested Delivery",
    });
    delivery.user = user;
    await requestOrder(user.catalogue, user, delivery).catch(
      (error: TRPCError) => {
        expect(error.code).toBe("PRECONDITION_FAILED");
      },
    );
  });
  test("throw when items are not assigned to the user", async () => {
    const user = await User.findOneByOrFail({
      userName: "Assigned User",
    });
    const item = await Item.createAndSave({
      name: "New Unassigned Item",
      description: "",
      price: (10).toFixed(2),
      image: "",
      thumbnail: "",
    });
    const { deliveries } = await viewUserProfile(user);
    const delivery = deliveries[0];
    delivery.user = user;
    await requestOrder([item], user, deliveries[0]).catch(
      (error: TRPCError) => {
        expect(error.code).toBe("PRECONDITION_FAILED");
      },
    );
  });
});
