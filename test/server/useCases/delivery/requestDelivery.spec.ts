import { AppDataSource } from "../../../../src/server/database/dataSource";
import {
  Delivery,
  DeliveryStatus,
} from "../../../../src/server/entities/delivery.entity";
import { User } from "../../../../src/server/entities/user.entity";
import { requestDelivery } from "../../../../src/server/useCases/delivery/requestDelivery";

describe("Request Delivery", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });

  test("creates a new delivery with status 'requested'", async () => {
    const user = await User.findOneByOrFail({ userName: "Accepted User" });
    await requestDelivery(
      {
        name: "New Delivery",
        street: "Rndm Dr.",
        number: "69",
        zip: "99999",
      },
      user,
    );
    const delivery = await Delivery.findOneByOrFail({ name: "New Delivery" });
    expect(delivery).toHaveProperty("state", DeliveryStatus.REQUESTED);
  });
});
