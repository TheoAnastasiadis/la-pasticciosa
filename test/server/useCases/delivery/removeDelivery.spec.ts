import { AppDataSource } from "../../../../src/server/database/dataSource";
import { deliveryRepo } from "../../../../src/server/database/repos/delivery.repo";
import { removeDelivery } from "../../../../src/server/useCases/delivery/removeDelivery";

describe("Remove Delivery", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });

  test("removes delivery from db", async () => {
    const delivery = await deliveryRepo.findOneByOrFail({
      name: "Requested Delivery",
    });
    await removeDelivery(delivery);
    const results = await deliveryRepo.findBy({
      name: "Requested Delivery",
    });
    expect(results).toHaveLength(0);
  });
});
