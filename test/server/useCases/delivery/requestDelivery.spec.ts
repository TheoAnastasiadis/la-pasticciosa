import { AppDataSource } from "../../../../src/server/database/dataSource";
import { deliveryRepo } from "../../../../src/server/database/repos/delivery.repo";
import { requestDelivery } from "../../../../src/server/useCases/delivery/requestDelivery";

describe("Request Delivery", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  test("creates a new delivery with status 'requested'", async () => {
    const delivery = deliveryRepo.create({
      name: "Fancy Restaurant",
      street: "Rndm Dr.",
      number: "69",
      zip: 99999,
      user: undefined,
    });
    await requestDelivery(delivery);
    const results = await deliveryRepo.findBy({ name: "Fancy Restaurant" });
    expect(results).toHaveLength(1);
  });

  afterAll(async () => {
    await deliveryRepo.delete({ name: "Fancy Restaurant" });
  });
});
