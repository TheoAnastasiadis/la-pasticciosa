import { AppDataSource } from "../../../src/server/database/dataSource";
import {
  Delivery,
  DeliveryStatus,
} from "../../../src/server/entities/delivery.entity";
import type { User } from "../../../src/server/entities/user.entity";
import { createCaller } from "./testObjects";

let callAsAcceptedUser: Awaited<
  ReturnType<typeof createCaller>
>["callAsAcceptedUser"];
let callAsAdmin: Awaited<ReturnType<typeof createCaller>>["callAsAdmin"];
let user: User;
let admin: User;

describe("Delivery Routes", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const callers = await createCaller();
    callAsAcceptedUser = callers.callAsAcceptedUser;
    callAsAdmin = callers.callAsAdmin;
    user = callers.user;
    admin = callers.admin;
  });
  test("request delivery and then remove [as user]", async () => {
    const delivery = await callAsAcceptedUser.requestDelivery({
      name: "Company HQ",
      street: "Main St.",
      number: "1A",
      zip: "12345",
      details: "Building E, South entrance",
    });
    await callAsAcceptedUser.removeDelivery({
      userId: user.uuid,
      deliveryId: delivery.id,
    }); // hopefully this won't throw
    expect(delivery).toHaveProperty("state", DeliveryStatus.REQUESTED);
  });
  test("accept delivery [as admin]", async () => {
    const delivery = await Delivery.findOneByOrFail({
      state: DeliveryStatus.REQUESTED,
    });
    const result = await callAsAdmin.acceptDelivery(delivery.id);
    expect(result).toHaveProperty("state", DeliveryStatus.ACCEPTED);
  });
  test("remove delivery [as admin]", async () => {
    const delivery = await Delivery.findOne({
      where: [
        { state: DeliveryStatus.ACCEPTED },
        { state: DeliveryStatus.REQUESTED },
      ],
    });
    if (delivery === null) throw new TypeError("Test case error");
    await callAsAdmin.removeDelivery({
      userId: admin.uuid,
      deliveryId: delivery.id,
    });
  });
});
