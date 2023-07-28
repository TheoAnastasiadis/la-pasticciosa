import type { TRPCError } from "@trpc/server";
import { AppDataSource } from "../../../../src/server/database/dataSource";
import { deliveryRepo } from "../../../../src/server/database/repos/delivery.repo";
import { itemRepo } from "../../../../src/server/database/repos/item.repo";
import { userRepo } from "../../../../src/server/database/repos/user.repo";
import { OrderStatus } from "../../../../src/server/entities/order.entity";
import { requestOrder } from "../../../../src/server/useCases/order/requestOrder";
import { viewUserProfile } from "../../../../src/server/useCases/users/viewUserProfile";

describe("Request Order", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });
  test("places a new order, when items and delivery are valid", async () => {
    const user = await userRepo.findOneByOrFail({ userName: "Assigned User" });
    const { deliveries } = await viewUserProfile(user);
    const delivery = deliveries[0];
    delivery.user = user;
    const order = await requestOrder(user.catalogue, user, delivery);
    expect(order.total).toEqual("27.24");
    expect(order.status).toEqual(OrderStatus.PENDING);
  });
  test("throws when delivery is not accepted", async () => {
    const user = await userRepo.findOneByOrFail({ userName: "Assigned User" });
    const delivery = await deliveryRepo.findOneByOrFail({
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
    const user = await userRepo.findOneByOrFail({
      userName: "Assigned User",
    });
    const item = itemRepo.create({
      name: "New Unassigned Item",
      description: "",
      price: (10).toFixed(2),
      image: "",
      thumbnail: "",
    });
    await itemRepo.insert(item);
    await item.reload();
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
