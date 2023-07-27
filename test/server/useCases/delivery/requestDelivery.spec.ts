import { AppDataSource } from "../../../../src/server/database/dataSource";
import { deliveryRepo } from "../../../../src/server/database/repos/delivery.repo";
import { DeliveryStatus } from "../../../../src/server/entities/delivery.entity";
import { requestDelivery } from "../../../../src/server/useCases/delivery/requestDelivery";

describe("Request Delivery", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });

  test("creates a new delivery with status 'requested'", async () => {
    const delivery = deliveryRepo.create({
      name: "New Delivery",
      street: "Rndm Dr.",
      number: "69",
      zip: 99999,
      user: undefined,
    });
    await requestDelivery(delivery);
    const results = await deliveryRepo.findBy({ name: "New Delivery" });
    expect(results).toHaveLength(1);
    expect(results.at(0)).toHaveProperty("state", DeliveryStatus.REQUESTED);
  });
});
