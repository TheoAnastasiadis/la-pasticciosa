import { AppDataSource } from "../../../../src/server/database/dataSource";
import { deliveryRepo } from "../../../../src/server/database/repos/delivery.repo";
import { DeliveryStatus } from "../../../../src/server/entities/delivery.entity";
import { acceptDelivery } from "../../../../src/server/useCases/delivery/acceptDelivery";

describe("Request Delivery", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();

    const delivery = deliveryRepo.create({
      name: "Fancy Restaurant",
      street: "Rndm Dr.",
      number: "69",
      zip: 99999,
      user: undefined,
    });

    await deliveryRepo.insert(delivery);
  });

  test("creates a new delivery with status 'requested'", async () => {
    const delivery = await deliveryRepo.findOneBy({ name: "Fancy Restaurant" });
    if (delivery == null) throw new Error("Test case error");
    await acceptDelivery(delivery);
    await delivery.reload();
    expect(delivery).toHaveProperty("state", DeliveryStatus.ACCEPTED);
  });

  afterAll(async () => {
    await deliveryRepo.delete({ name: "Fancy Restaurant" });
  });
});
